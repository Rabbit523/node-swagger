import { Request, Response, NextFunction } from 'express';

export const saveUserToDatabaseMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { newUser } = response.locals;
    response.locals.savedUser = await newUser.save();
    next();
  } catch (err) {
    next(err);
  }
};
