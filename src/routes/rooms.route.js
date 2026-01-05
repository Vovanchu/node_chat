import { Router } from 'express';
import { roomController } from '../controllers/room.controller.js';

const route = Router();

route.post('/rooms', roomController.createRoom);
route.get('/rooms', roomController.getAllRooms);
route.delete('/rooms/:roomId', roomController.deleteRoom);
route.put('/rooms/:roomId', roomController.updateRoom);

export default route;
