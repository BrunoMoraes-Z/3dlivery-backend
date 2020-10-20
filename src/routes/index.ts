import { Router } from 'express';

import usersRouter from './user.routes';
import sessionsRouter from './session.routes';
import providersRouter from './provider.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/providers', providersRouter);
routes.use('/session', sessionsRouter);

routes.get('/', (request, response) => {
  return response.status(200).json({ ok: 'true' });
});


export default routes;
