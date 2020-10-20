import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../errors/AppError';

import User from '../../models/User';
import Provider from '../../models/Provider';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User | false> {
    const userRepository = getRepository(User);
    const providerRepository = getRepository(Provider);

    const checkUserExists = await userRepository.findOne({ where: { email } });

    const checkEmailExists = await providerRepository.findOne({ where: { email }});


    if (checkUserExists || checkEmailExists) {
      throw new AppError('Email já está vinculado a uma conta de usuario', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({ name, email, password: hashedPassword });

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
