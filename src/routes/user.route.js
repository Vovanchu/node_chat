import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const route = Router();

route.get('/users', userController.getAllMessages);
route.post('/users', userController.createMessage);
route.delete('/users/:userId', userController.deleteMessage);
route.put('/users/:userId', userController.updateMessage);

export default route;
