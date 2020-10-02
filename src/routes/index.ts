import { Router } from 'express';

import usersRouter from './user.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.get('/', (request, response) => {
  return response.status(200).json({ok: 'true'});
});


export default routes;
