import { Router } from 'express';
import multer from 'multer';

import config from '../config/upload';
import middlewareJwt from '../middleware/middlewareJWT';
import AppError from '../errors/AppError';

const upload = multer(config);
const router = Router();

router.use(middlewareJwt);

router.post('/', upload.single('drawing'), async (request, response) => {

  const file = request.file;
  const type = file.originalname.split(".")[file.originalname.split(".").length - 1]

  if (type !== 'stl') {
    throw new AppError('Formato do arquivo incorreto.', 400);
  }

  console.log(request.file);

  return response.json({ status: 'OK' });
});

export default router;