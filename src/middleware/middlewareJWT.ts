import {Request, Response, NextFunction} from 'express';

import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import { invalidJWT } from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): any {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json(invalidJWT);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub }
    request.provider = { id: sub }

    return next();
  } catch {
    return response.status(401).json(invalidJWT);
  }
}
