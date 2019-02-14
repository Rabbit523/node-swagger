import { Request, Response, NextFunction } from 'express';

export const sendFormattedUserMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { savedUser } = response.locals;
    savedUser.password = undefined;
    return response.send(savedUser);
  } catch (err) {
    next(err);
  }
};
