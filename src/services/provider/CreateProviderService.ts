import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Provider from '../../models/Provider';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateProviderService {
  public async execute({ name, email, password }: Request): Promise<any> {
    const repository = getRepository(Provider);

    const checkUserExists = await repository.findOne({ where: { email } });

    if (checkUserExists) {
      return false;
    }

    const hashedPassword = await hash(password, 8);
    const provider = repository.create({ name, email, password: hashedPassword });
    await repository.save(provider);

    delete provider.password;

    return provider;
  }
}

export default CreateProviderService;
