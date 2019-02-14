import { Request, Response, NextFunction } from 'express';
import { userModel } from '../../Models/User';

export const getCreateUserFromRequestMiddleware = user => (request: Request, response: Response, next: NextFunction) => {
  const { hashedPassword } = response.locals;
  const { userName, email } = request.body;
  response.locals.newUser = new user({ userName, email, password: hashedPassword });
  next();
};

export const createUserFromRequestMiddleware = getCreateUserFromRequestMiddleware(userModel);
