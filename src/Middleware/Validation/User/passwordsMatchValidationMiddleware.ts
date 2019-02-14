import { Request, Response, NextFunction } from 'express';
import { loginUnsuccessfulMessage } from '../../../Messages/failure.messages';

export const getPasswordsMatchValidationMiddleware = loginUnsuccessfulMessage => (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { passwordMatchesHash } = response.locals;
    if (!passwordMatchesHash) {
      return response.status(400).send({
        message: loginUnsuccessfulMessage,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const passwordsMatchValidationMiddleware = getPasswordsMatchValidationMiddleware(loginUnsuccessfulMessage);
