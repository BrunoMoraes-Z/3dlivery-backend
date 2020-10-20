import { Router} from 'express';

import CreateUserService from '../services/user/CreateUserService';
import AlterUserService from '../services/user/AlterUserSerice';
import ListAllProviders from '../services/user/ListAllProviders';

import middlewareJwt from '../middleware/middlewareJWT';
import AppError from '../errors/AppError';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });

  if (!user) {
    throw new AppError('Erro ao criar usuario.', 400);
  }

  return response.status(200).json({status: "success", user});
});

usersRouter.use(middlewareJwt);


usersRouter.patch('/', async (request, response) => {
  const { name, email, password } = request.body;

  if (!name && !email && !password) {
    throw new AppError('Favor enviar algum campo para atualização', 400);
  }

  const id = request.id;

  const AlterUserSerice = new AlterUserService();

  const updatedUser = await AlterUserSerice.execute({ id, name, email, password });

  if (!updatedUser) {
    throw new AppError('Erro ao cadastrar usuario.', 400);
  }

  return response.status(200).json({status: "success", updatedUser});
});

usersRouter.get('/list-providers', async (request, response) => {

  const service = new ListAllProviders();

  const providers = await service.execute();

  if (!providers) {
    throw new AppError('Não existe nenhum provedor.', 400);
  }

  return response.status(200).json({status: 'success', providers});
}); 

export default usersRouter;
