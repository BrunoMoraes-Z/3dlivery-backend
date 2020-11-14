import { getRepository } from 'typeorm';

import Drawing from '../../models/Drawing';
import AppError from '../../errors/AppError';

interface Request {
  name: string;
  height: number;
  width: number;
}

class CreateDrawingService {
  public async execute({name, height, width}: Request): Promise<Drawing | false> {
    const repository = getRepository(Drawing);

    if (!name && !height && !width) {
      throw new AppError('Favor enviar todos os campos para criação de um desenho.', 400);
    }

    const drawing = repository.create({name, height, width});
    const response = await repository.save(drawing);

    if (!response) {
      throw new AppError('Erro ao cadastrar desenho.', 400);
    }

    return drawing;
  }
}

export default CreateDrawingService;