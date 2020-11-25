import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';
import Drawing from '../../models/Drawing';

class ListAllDrawing {
  public async execute(): Promise<Drawing[]> {
    const drawingRepository = getRepository(Drawing);

    const drawing = await drawingRepository.find();

    if (!drawing) {
      throw new AppError('Não existe nenhum desenho.', 400);
    }

    return drawing;
  }
}

export default ListAllDrawing;
