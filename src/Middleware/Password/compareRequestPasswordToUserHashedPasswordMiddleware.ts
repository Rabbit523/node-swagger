import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcryptjs';

export const getCompareRequestPasswordToUserHashedPasswordMiddleware = compare => async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const requestPassword = request.body.password;
    const { password } = response.locals.user;
    response.locals.passwordMatchesHash = await compare(requestPassword, password);
    next()
  } catch (err) {
    next(err);
  }
};

export const compareRequestPasswordToUserHashedPasswordMiddleware = getCompareRequestPasswordToUserHashedPasswordMiddleware(compare);
