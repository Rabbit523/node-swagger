import { Request, Response, NextFunction } from 'express';
import { loginUnsuccessfulMessage } from '../../../Messages/failure.messages';

export const  getUserExistsValidationMiddleware  = userDoesNotExistMessage => (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { user } = response.locals;
    if (!user) {
      return response.status(400).send({
        message: userDoesNotExistMessage,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const userExistsValidationMiddleware = getUserExistsValidationMiddleware(loginUnsuccessfulMessage);
