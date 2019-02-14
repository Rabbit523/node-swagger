import { Request, Response, NextFunction } from 'express';
import { userModel } from '../../Models/User';

export const getDoesUserEmailExistMiddleware = userModel => async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { email } = request.body;
    const user = await userModel.findOne({ email });
    if (user) {
      response.locals.emailExists = true;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const doesUserEmailExistMiddleware = getDoesUserEmailExistMiddleware(userModel);
