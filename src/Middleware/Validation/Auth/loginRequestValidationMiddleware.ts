import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

import { getValidationErrorMessageSenderMiddleware } from '../User/validationErrorMessageSenderMiddleware';

const loginValidationSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

export const loginRequestValidationMiddleware = (request: Request, response: Response, next: NextFunction): void => {
  Joi.validate(request.body, loginValidationSchema, getValidationErrorMessageSenderMiddleware(request, response, next));
};
