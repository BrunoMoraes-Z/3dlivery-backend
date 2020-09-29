import { Router } from 'express';

const routes = Router();

routes.use('/', (request, response) => {
  return response.status(200).json({ok: 'true'});
});


export default routes;
