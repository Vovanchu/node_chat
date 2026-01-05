import { userService } from '../services/users.service';

const getAllUsers = async (req, res) => {
  const users = await userService.getAll();

  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const user = await userService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
};

export const userController = {
  getAllUsers,
  getUserById,
};
