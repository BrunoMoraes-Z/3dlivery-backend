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

    let cost = 10;

    if (height <= 30 || width <= 30) {
      cost = 100;
    }

    if (height >= 31 &&  height <= 70 || width >= 31 && width <= 70) {
      cost = 200;
    }

    if (height >= 71 && height <= 120 || width >= 71 && width <= 120) {
      cost = 350;
    }

    if (height >= 121 || width >= 121) {
      cost = 500;
    }

    const drawing = repository.create({name, height, width, cost});
    const response = await repository.save(drawing);

    if (!response) {
      throw new AppError('Erro ao cadastrar desenho.', 400);
    }

    return drawing;
  }
}

export default CreateDrawingService;