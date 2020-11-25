import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';
import Drawing from '../../models/Drawing';

interface Request {
  id: string;
}

class ListDrawing {
  public async execute({id}: Request): Promise<Drawing> {
    const drawingRepository = getRepository(Drawing);

    const drawing = await drawingRepository.findOne({ where: id});

    if (!drawing) {
      throw new AppError('Não existe desenho com esse id.', 400);
    }

    return drawing;
  }
}

export default ListDrawing;
