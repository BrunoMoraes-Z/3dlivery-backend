import { Router, request } from 'express';

import CreateUserService from '../services/user/CreateUserService';
import AlterUserService from '../services/user/AlterUserSerice';

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

  return response.json(user);
});

usersRouter.use(middlewareJwt);


usersRouter.patch('/', async (request, response) => {
  const { name, email, password } = request.body;

  const id = request.user.id;

  const AlterUserSerice = new AlterUserService();

  const updatedUser = await AlterUserSerice.execute({ id, name, email, password });

  if (!updatedUser) {
    throw new AppError('Erro ao cadastrar usuario.', 400);
  }

  return response.status(200).json(updatedUser);
});

export default usersRouter;
