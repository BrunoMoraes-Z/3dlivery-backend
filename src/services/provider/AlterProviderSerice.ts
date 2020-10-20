import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Provider from '../../models/Provider';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
}

class AlterProviderSerice {
  public async execute({id, name, email, password}: Request): Promise<Provider | false> {

    if (!name && !email && !password) {
      throw new AppError('Favor enviar algum campo para atualização', 400);
    }

    const repository = getRepository(Provider);

    const provider = await repository.findOne({ where: { id }}); 

    if (!provider) {
      throw new AppError('Usuario não encontrado.', 400);
    }

    if( email !== provider.email ) {
      const exist = await repository.findOne({ where: { email } });

      if (exist) {
        throw new AppError('Email já está vinculado a uma conta.', 400);
      }
    }

    const updated_at = new Date();

    const hashedPassword = await hash(password, 8);

    const response = await repository.save({id, name, email, password: hashedPassword, updated_at});

    if (!response) {
      throw new AppError('Erro ao atualizar usuario.', 500);
    }

    delete provider.password

    return provider;
  }
}

export default AlterProviderSerice;