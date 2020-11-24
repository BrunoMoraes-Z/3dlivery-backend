import { Router } from 'express';
import multer from 'multer';

import config from '../config/upload';
import middlewareJwt from '../middleware/middlewareJWT';

import CreateDrawingService from '../services/drawing/CreateDrawingService';

import AlterDrawingSerice from '../services/drawing/AlterDrawingSerice';

import DeleteDrawingService from '../services/drawing/DeleteDrawingService';

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

  return response.json({ status: 'OK' });
});

router.post('/create-drawing', async (request, response) => {
  const { name, height, width } = request.body;

  const createDrawing = new CreateDrawingService();

  const drawing = await createDrawing.execute({ name, height, width });

  return response.status(200).json(drawing);
});

router.patch('/alter-drawing', async (request, response) => {
  const { name, height, width } = request.body;

  if (!name && !height && !width) {
    throw new AppError('Favor enviar algum campo para atualização', 400);
  }

  const id = request.id;

  const alterDrawingSerice = new AlterDrawingSerice();

  const updatedUser = await alterDrawingSerice.execute({ id, name, height, width});

  if (!updatedUser) {
    throw new AppError('Erro ao cadastrar usuario.', 400);
  }

  return response.status(200).json({status: "success", updatedUser});
});

router.patch('/delete-drawing', async (request, response) => {
  const id = request.id;

  const deleteDrawingSerice = new DeleteDrawingService();

  const result = await deleteDrawingSerice.execute({id});

  if (!result) {
    throw new AppError('Erro ao cadastrar usuario.', 400);
  }

  return response.status(200).json({status: "success", message: "Usuario deletado com sucesso."});
});

export default router;