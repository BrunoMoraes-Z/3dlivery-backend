import { Router } from 'express';
import multer from 'multer';

import config from '../config/upload';
import middlewareJwt from '../middleware/middlewareJWT';

const upload = multer(config);
const router = Router();

router.use(middlewareJwt);

router.post('/', upload.single('drawing'), async (request, response) => {

  console.log(request.file);

  return response.json({ status: 'OK' });
});

export default router;

// import CreateUserService from '../services/user/CreateUserService';
// import AlterUserService from '../services/user/AlterUserSerice';
// import middlewareJwt from '../middleware/middlewareJWT';
// import AppError from '../errors/AppError';

// const usersRouter = Router();

// usersRouter.post('/', async (request, response) => {
//   const { name, email, password } = request.body;

//   const createUser = new CreateUserService();

//   const user = await createUser.execute({ name, email, password });

//   if (!user) {
//     throw new AppError('Erro ao criar usuario.', 400);
//   }

//   return response.status(200).json({status: "success", user});
// });

// usersRouter.use(middlewareJwt);


// usersRouter.patch('/', async (request, response) => {
//   const { name, email, password } = request.body;

//   if (!name && !email && !password) {
//     throw new AppError('Favor enviar algum campo para atualização', 400);
//   }

//   const id = request.id;

//   const AlterUserSerice = new AlterUserService();

//   const updatedUser = await AlterUserSerice.execute({ id, name, email, password });

//   if (!updatedUser) {
//     throw new AppError('Erro ao cadastrar usuario.', 400);
//   }

//   return response.status(200).json({status: "success", updatedUser});
// });

// export default usersRouter;
