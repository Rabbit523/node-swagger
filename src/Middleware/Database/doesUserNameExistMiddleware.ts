import { Request, Response, NextFunction } from 'express';
import { userModel } from '../../Models/User';

export const getDoesUserNameExistMiddleware = userModel => async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { userName } = request.body;
    const user = await userModel.findOne({ userName });
    if (user)  {
      response.locals.userNameExists = true;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const doesUserNameExistMiddleware = getDoesUserNameExistMiddleware(userModel);
