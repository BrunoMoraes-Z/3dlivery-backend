import { Router } from 'express';

import CreateProviderService from '../services/provider/CreateProviderService';
import AppError from '../errors/AppError';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const service = new CreateProviderService();

  const provider = await service.execute({ name, email, password });

  if (!provider) {
    throw new AppError('Erro ao cadastrar usuario.', 400);
  }

  return response.json(provider);
});

export default usersRouter;
