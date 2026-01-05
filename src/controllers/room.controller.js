import { roomService } from '../services/room.service';
import { userService } from '../services/user.service';

const getAllRooms = (req, res) => {
  const rooms = roomService.getAllRooms();

  res.json(rooms);
};

const createRoom = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Room name required' });

      return;
    }

    const room = await roomService.createRoom(name);

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteRoom = (req, res) => {
  const { roomId } = req.params;

  roomService.deleteRoom(roomId);

  res.sendStatus(201);
};

const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { name } = req.body;

    const room = roomService.getRoom(roomId);

    if (!room) {
      res.status(404).json({ message: 'Room not found' });

      return;
    }

    await roomService.updateRoom(room, name);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const joinRooms = async (req, res) => {
  const id = +req.params.id;
  const userId = +req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const room = await roomService.getRoom(id);

  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  const user = await userService.getById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const members = Array.isArray(room.members) ? room.members.slice() : [];

  if (!members.includes(userId)) {
    members.push(userId);
    await room.update({ members });
  }

  res.status(200).json(room);
};

export const roomController = {
  getAllRooms,
  createRoom,
  deleteRoom,
  updateRoom,
  joinRooms,
};
