import { getRepository } from 'typeorm';

import Drawing from '../../models/Drawing';
import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class CreateDrawingService {
  public async execute({id}: Request): Promise<true> {
    const drawingRepository = getRepository(Drawing);

    if (!id) {
      throw new AppError('Id não informado para deletar o desenho.', 400);
    }

    const drawing = await drawingRepository.findOne({ where: { id }});

    if (!drawing) {
      throw new AppError('Desenho não encontrado.', 400);
    }

    const response = await drawingRepository.remove(drawing);

    console.log(response);

    if (!response) {
      throw new AppError('Erro ao cadastrar desenho.', 400);
    }

    return true;
  }
}

export default CreateDrawingService;