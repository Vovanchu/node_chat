import { Message } from '../model/model.js';

const getAll = () => {
  return Message.findAll();
};

const getById = (messageId) => {
  Message.findByPk(messageId);
};

const createMessage = (roomId, authorId, text) => {
  Message.create({
    roomId,
    authorId,
    text,
  });
};

const deleteMessage = (messageId) => {
  Message.destroy({
    where: {
      id: messageId,
    },
  });
};

const update = (messageId, text) => {
  Message.update(
    {
      text,
    },
    {
      where: {
        id: messageId,
      },
    },
  );
};

export const messageService = {
  getAll,
  getById,
  createMessage,
  deleteMessage,
  update,
};
