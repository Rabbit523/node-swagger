import { Request, Response, NextFunction } from 'express';
import { missingJsonWebTokenMessage } from '../../../Messages/failure.messages';

export const getJsonWebTokenValidationMiddleware = (jsonWebTokenValidationErrorObject: { auth: boolean, message: string }) => (request: Request, response: Response, next: NextFunction) => {
  try {
    const { jsonWebToken } = response.locals;
    if (!jsonWebToken) return response.status(401).send(jsonWebTokenValidationErrorObject);
    next();
  } catch (err) {
    next(err);
  }
};

export const jsonWebTokenValidationMiddleware = getJsonWebTokenValidationMiddleware({ auth: false, message: missingJsonWebTokenMessage });
