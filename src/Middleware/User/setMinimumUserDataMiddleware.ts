import { Request, Response, NextFunction } from 'express';

export const setMinimumUserDataMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { user } = response.locals;
    const minimumUserData = {
      _id: user._id,
      userName: user.userName,
    };
    response.locals.minimumUserData = minimumUserData;
    next();
  } catch (err) {
    next(err);
  }
};
