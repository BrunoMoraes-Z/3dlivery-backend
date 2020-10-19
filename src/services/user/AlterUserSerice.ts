import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
}

class AlterUserService {
  public async execute({id, name, email, password}: Request): Promise<User | false> {
    console.log('teste')
    if (!name && !email && !password) {
      throw new AppError('Favor enviar algum campo para atualização', 400);
    }

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id }}); 

    if (!user) {
      throw new AppError('Usuario não encontrado.', 400);
    }

    if( email !== user.email ) {
      const userExist = await userRepository.findOne({ where: { email } });

      if (userExist) {
        throw new AppError('Email já está vinculado a uma conta.', 400);
      }
    }

    const updated_at = new Date();

    const hashedPassword = await hash(password, 8);

    const response = await userRepository.save({id, name, email, password: hashedPassword, updated_at});

    if (!response) {
      throw new AppError('Erro ao atualizar usuario.', 500);
    }

    delete user.password

    return user;
  }
}

export default AlterUserService;