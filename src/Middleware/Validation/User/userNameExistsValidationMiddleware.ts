import { Request, Response, NextFunction } from 'express';
import { ErrorMessageHelper } from '../../../Utils/errorMessage.helper';
import { userNameKey } from '../../../Constants/Keys/keys';

export const getUserNameExistsValidationMiddleware  = (generateAlreadyExistsMessage, userNameKey) => (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { userNameExists } = response.locals;
    const { userName } = request.body;
    if (userNameExists) {
      return response.status(400).send({
        message: generateAlreadyExistsMessage(
          userNameKey,
          userName,
        ),
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const userNameExistsValidationMiddleware = getUserNameExistsValidationMiddleware(ErrorMessageHelper.generateAlreadyExistsMessage, userNameKey);
