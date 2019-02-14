import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
// import { jwtSecret } from '../../../secret/jwt-secret';

import { jwtSecret } from '../../scret/jwt-secret';

export const getSignJsonWebTokenMiddleware = (signToken: Function, jwtSecret: string, jwtOptions: object) => (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { minimumUserData } = response.locals;
    const jsonWebToken = signToken({ minimumUserData }, jwtSecret, jwtOptions);
    response.locals.jsonWebToken = jsonWebToken;
    next();
  } catch (err) {
    next(err);
  }
};

export const setJsonWebTokenMiddleware = getSignJsonWebTokenMiddleware(jwt.sign, jwtSecret, { expiresIn: '7d' });
