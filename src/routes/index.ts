import { Router } from 'express';

import usersRouter from './user.routes';
import sessionsRouter from './session.routes';
import providersRouter from './provider.routes';
import drawingRouter from './drawing.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/providers', providersRouter);
routes.use('/session', sessionsRouter);
routes.use('/drawing', drawingRouter);

export default routes;

/*
localhost:3010/session - { post }
localhost:3010/users { post, patch } 
localhost:3010/providers { post, patch } 

*/