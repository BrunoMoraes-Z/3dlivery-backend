import { Router } from 'express';

import AuthenticateUserService from '../services/user/AuthenticateUserService';
import { invalidCredentials } from '../errors';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticate = new AuthenticateUserService();

  const user = await authenticate.execute({ email, password });

  if (!user) {
    return response.status(401).json(invalidCredentials);
  }

  return response.json(user);
});

export default usersRouter;
