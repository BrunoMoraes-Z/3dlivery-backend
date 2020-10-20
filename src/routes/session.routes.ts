import { Router } from 'express';

import AuthenticateUserService from '../services/user/AuthenticateUserService';
import AuthenticateProviderService from '../services/provider/AuthenticateProviderService';
import AppError from '../errors/AppError';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const auth_user = new AuthenticateUserService();

  const user = await auth_user.execute({ email, password });

  if (!user) {

    const auth_provider = new AuthenticateProviderService();

    const provider = await auth_provider.execute({email, password});

    if (!provider) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    return response.json(provider);
    // throw new AppError('Incorrect email/password combination.', 401);
  }

  return response.json(user);
});

export default usersRouter;
