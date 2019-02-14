import { Request, Response, NextFunction } from 'express';

export const jsonWebTokenHeaderName = 'x-access-token';

export const getRetreiveJsonWebTokenMiddleware = (jsonWebTokenHeaderName: string) => (
  request: Request, response: Response, next: NextFunction) => {
  try {
    response.locals.jsonWebToken = request.headers[jsonWebTokenHeaderName];;
    next();
  } catch (err) {
    next(err);
  }
};

export const retreiveJsonWebTokenMiddleware = getRetreiveJsonWebTokenMiddleware(jsonWebTokenHeaderName);
