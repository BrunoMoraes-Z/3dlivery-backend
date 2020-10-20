import { Router } from 'express';

import usersRouter from './user.routes';
import sessionsRouter from './session.routes';
import providersRouter from './provider.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/providers', providersRouter);
routes.use('/session', sessionsRouter);

export default routes;

/*
localhost:3010/session - { post }
localhost:3010/users { post, patch } 
localhost:3010/providers { post, patch } 

*/