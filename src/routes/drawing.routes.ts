import { Router } from 'express';
import multer from 'multer';
import * as fs from 'fs';
import path from 'path';
// import * as stl from 'node-stl';

import config from '../config/upload';
import middlewareJwt from '../middleware/middlewareJWT';

import CreateDrawingService from '../services/drawing/CreateDrawingService';

import AppError from '../errors/AppError';

const upload = multer(config);
const router = Router();
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

router.use(middlewareJwt);

router.post('/', upload.single('drawing'), async (request, response) => {

  const file = request.file;
  const name = file.filename;
  const type = file.originalname.split(".")[file.originalname.split(".").length - 1]

  if (type !== 'stl') {
    fs.unlink(tmpFolder + '/' + name, (c) => {
      if (c !== null) {
        console.log(c);
      }
    });
    throw new AppError('Formato do arquivo incorreto.', 400);
  }

  // try {
  //   const s = stl(tmpFolder + "/" + name,);
  // } catch (error) {
  //   console.log(error);
  // }

  return response.json({ status: 'OK' });
});

router.post('/create-drawing', async (request, response) => {
  const { name, height, width } = request.body;

  const createDrawing = new CreateDrawingService();

  const drawing = await createDrawing.execute({ name, height, width });

  return response.status(200).json(drawing);

});

export default router;