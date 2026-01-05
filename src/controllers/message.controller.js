/* eslint-disable no-useless-return */
import { messageService } from '../services/message.service.js';
import { roomService } from '../services/room.service.js';
import { userService } from '../services/user.service.js';

const getAllMessages = (req, res) => {
  const messages = messageService.getAll();

  res.json(messages);
};

const createMessage = async (req, res) => {
  const { roomId, authorId, text } = req.body;

  if (!roomId || !authorId || !text) {
    res.status(400).json({ message: 'Room id, author id and text required' });

    return;
  }

  const room = roomService.getById(+roomId);
  const author = userService.getById(+authorId);

  if (!room || !author) {
    res.status(404).json({ message: 'Room or author not found' });

    return;
  }

  await messageService.createMessage(roomId, authorId, text);

  res.sendStatus(201);
};

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  if (!messageId) {
    res.status(400).json({ message: 'Message id required' });

    return;
  }

  const message = messageService.getById(+messageId);

  if (!message) {
    res.status(404).json({ message: 'Message not found' });

    return;
  }

  await messageService.deleteMessage(+messageId);

  res.sendStatus(201);
};

const updateMessage = (req, res) => {
  const { messageId } = req.params;
  const { text } = req.body;

  if (!messageId || !text) {
    res.status(400).json({ message: 'Message id and text required' });

    return;
  }

  const message = messageService.getById(+messageId);

  if (!message) {
    res.status(404).json({ message: 'Message not found' });

    return;
  }

  messageService.update(+messageId, text);

  res.sendStatus(201);
};

export const messageController = {
  getAllMessages,
  createMessage,
  deleteMessage,
  updateMessage,
};
