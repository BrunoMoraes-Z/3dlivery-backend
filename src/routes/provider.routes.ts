import { Router } from 'express';

import CreateProviderService from '../services/provider/CreateProviderService';
import AppError from '../errors/AppError';
import middlewareJwt from '../middleware/middlewareJWT';
import AlterProviderService from '../services/provider/AlterProviderSerice';
import ListAllProviders from '../services/provider/ListAllProviders';

const providersRouter = Router();

providersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const service = new CreateProviderService();

  const provider = await service.execute({ name, email, password });

  if (!provider) {
    throw new AppError('Erro ao cadastrar usuario.', 400);
  }

  return response.json(provider);
});

providersRouter.use(middlewareJwt);

providersRouter.patch('/', async (request, response) => {
  const { name, email, password } = request.body;

  const id = request.id

  const service = new AlterProviderService();

  const updatedProvider = await service.execute({ id, name, email, password });

  if (!updatedProvider) {
    throw new AppError('Erro ao cadastrar usuario.', 400);
  }

  return response.status(200).json(updatedProvider);
});

providersRouter.get('/list-providers', async (request, response) => {

  const service = new ListAllProviders();

  const providers = await service.execute();

  if (!providers) {
    throw new AppError('Não existe nenhum provedor.', 400);
  }

  return response.status(200).json({status: 'success', providers});
}); 

export default providersRouter;
