import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
// import { jwtSecret } from '../../../secret/jwt-secret';

import { jwtSecret } from '../../scret/jwt-secret';

export const getDecodeJsonWebTokenMiddleware = (
  verify: Function,
  jsonWebTokenSecret: string,
) => (request: Request, response: Response, next: NextFunction) => {
  try {
    const { jsonWebToken } = response.locals;
    const decodedToken = verify(
      jsonWebToken,
      jsonWebTokenSecret,
    );
    response.locals.decodedToken = decodedToken;
    next();
  } catch (err) {
    next(err);
  }
};

export const decodeJsonWebTokenMiddleware = getDecodeJsonWebTokenMiddleware(jwt.verify, jwtSecret);
