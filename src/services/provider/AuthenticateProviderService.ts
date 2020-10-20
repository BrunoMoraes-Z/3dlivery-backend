import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import config from '../../config/auth';
import Provider from '../../models/Provider';

interface Request {
  email: string;
  password: string;
}

class AuthenticateProviderService {
  public async execute({ email, password }: Request): Promise<{token: string} | null> {
    const repository = getRepository(Provider);

    const provider = await repository.findOne({ where: { email } });

    if (!provider) {
      return null;
    }

    const passwordMatched = await compare(password, provider.password);

    if (!passwordMatched){
      return null;
    }

    const token = sign({}, config.jwt.secret, {
      subject: provider.id,
      expiresIn: config.jwt.expiresIn
    });

    const result = {
      user: {
        name: provider.name,
        email: provider.email
      },
      token
    }

    return result;
  }
}

export default AuthenticateProviderService;
