/* eslint-disable no-console */
'use strict';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';

import usersRouter from './routes/user.route.js';
import messagesRouter from './routes/message.route.js';
import roomsRouter from './routes/rooms.route.js';

import { Message } from './model/Message.model.js';
import { User } from './model/User.model.js';

const app = express();

app.use(cors());
app.use(express.json());

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.static(path.join(dirname, '../client')));

app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/rooms', roomsRouter);

const server = app.listen(3005);

const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
  socket.on('message', async (raw) => {
    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      return socket.send(JSON.stringify({ error: 'Invalid JSON' }));
    }

    const { roomId, authorId, text } = data;

    if (!roomId || !authorId || !text) {
      return socket.send(
        JSON.stringify({ error: 'roomId, authorId and text required' }),
      );
    }

    socket.roomId = roomId;

    const created = await Message.create({ roomId, authorId, text });

    const message = await Message.findByPk(created.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username'],
        },
      ],
    });

    const payload = JSON.stringify(message);

    for (const client of wss.clients) {
      if (
        client.readyState === client.OPEN &&
        client.roomId === message.roomId
      ) {
        client.send(payload);
      }
    }
  });
});
