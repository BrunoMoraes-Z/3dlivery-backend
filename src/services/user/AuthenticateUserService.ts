import { getRepository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import config from '../../config/auth';
import User from '../../models/User';

interface Request {
  email: string;
  password: string;
}

interface user_info {
  name: string;
  email: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<{token: string} | null> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched){
      return null;
    }

    const token = sign({}, config.jwt.secret, {
      subject: user.id,
      expiresIn: config.jwt.expiresIn
    });

    const result = {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }

    return result;
  }
}

export default AuthenticateUserService;
