import { NextFunction, Request, Response } from 'express';

const notAllowedParameterErrorRegExp = /is not allowed/;

export const getValidationErrorMessageSenderMiddleware = (request: Request, response: Response, next: NextFunction) => (
  error: Error,
): void => {
  if (error) {
    if (notAllowedParameterErrorRegExp.test(error.message)) {
      response.status(400).send({ message: error.message });
    } else {
      response.status(422).send({ message: error.message });
    }
  } else {
    next();
  }
};
