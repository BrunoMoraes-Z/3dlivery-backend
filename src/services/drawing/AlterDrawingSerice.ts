import { getRepository } from 'typeorm';

import Drawing from '../../models/Drawing';
import AppError from '../../errors/AppError';

interface Request {
  id: string;
  name: string;
  height: number;
  width: number;
}

class AlterDrawingService {
  public async execute({id, name, height, width}: Request): Promise<Drawing> {
    const drawingRepository = getRepository(Drawing);
    
    const drawing = await drawingRepository.findOne({ where: { id }}); 

    if (!drawing) {
      throw new AppError('Desenho não encontrado.', 400);
    }

    let cost = 10;

    if (height <= 30 || width <= 30) {
      cost = 100;
    }

    if (height >= 31 &&  height <= 70 && width >= 31 && width <= 70) {
      cost = 200;
    }

    if (height >= 71 &&  height <= 120 && width >= 71 && width <= 120) {
      cost = 350;
    }

    if (height >= 121 || width >= 121) {
      cost = 500;
    }

    drawing.name = name;

    drawing.height = height;

    drawing.width = width;

    drawing.cost = cost;

    const updated_at = new Date();

    drawing.updated_at = updated_at;

    const response = await userRepository.save(drawing);

    if (!response) {
      throw new AppError('Erro ao atualizar desenho.', 500);
    }

    return drawing;
  }
}

export default AlterDrawingService;