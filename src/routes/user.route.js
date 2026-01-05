import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const route = Router();

route.get('/', userController.getAllMessages);
route.post('/', userController.createMessage);
route.delete('/:userId', userController.deleteMessage);
route.put('/:userId', userController.updateMessage);

export default route;
