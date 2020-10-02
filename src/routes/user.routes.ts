import { Router } from 'express';

import CreateUserService from '../services/user/CreateUserService';
import { existingUser } from '../errors';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  if (!user) {
    return response.status(400).json(existingUser);
  }

  return response.json(user);
});

export default usersRouter;
