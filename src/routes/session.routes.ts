import { Router } from 'express';

import AuthenticateUserService from '../services/user/AuthenticateUserService';
import AppError from '../errors/AppError';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticate = new AuthenticateUserService();

  const user = await authenticate.execute({ email, password });

  if (!user) {
    throw new AppError('Incorrect email/password combination.', 401);
  }

  return response.json(user);
});

export default usersRouter;
