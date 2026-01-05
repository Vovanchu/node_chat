import { Router } from 'express';
import { messageController } from '../controllers/message.controller.js';

const route = Router();

route.get('/messages', messageController.getAllMessages);
route.post('/messages', messageController.createMessage);
route.delete('/messages/:messageId', messageController.deleteMessage);
route.put('/messages/:messageId', messageController.updateMessage);

export default route;
