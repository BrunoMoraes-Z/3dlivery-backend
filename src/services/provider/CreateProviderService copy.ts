import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Provider from '../../models/Provider';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateProviderService {
  public async execute({ name, email, password }: Request): Promise<Provider | false> {    

    const repository = getRepository(Provider);
    const exist = await repository.findOne({ where: { email } });

    if (exist) {
      return false;
    }

    const pass = await hash(password, 8);
    const provider = repository.create({ name, email, password: pass });
    await repository.save(provider);

    console.log(provider);

    // delete provider.password;

    return provider;
  }
}

export default CreateProviderService;