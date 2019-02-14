import { Request, Response, NextFunction } from "express";
import { getValidationErrorMessageSenderMiddleware } from "../../../../../src/Middleware/Validation/User/validationErrorMessageSenderMiddleware";

describe(`validationErrorMessageSenderMiddleware`, () => {
  it("calls 'next' middleware if all params are correct ", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const request = {
      query: { param: true }
    };
    const response: any = {
      status
    };
    const next = jest.fn();

    const middleware = getValidationErrorMessageSenderMiddleware(
      request as Request,
      response as Response,
      next as NextFunction
    );

    middleware(null);

    expect.assertions(3);
    expect(status).not.toHaveBeenCalled();
    expect(send).not.toBeCalled();
    expect(next).toBeCalled();
  });

  it("check that notAllowedParameter error is thrown when error message returns is not allowed", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const request = {
      query: { param: true }
    }
    const response: any = {
      status
    };
    const next = jest.fn();

    const middleware = getValidationErrorMessageSenderMiddleware(
      request as Request,
      response as Response,
      next as NextFunction
    );

    const paramNotAllowedError = '"param" is not allowed';
    middleware(new Error(paramNotAllowedError));

    expect.assertions(3);
    expect(status).toHaveBeenCalledWith(400);
    expect(send).toBeCalledWith({ message: paramNotAllowedError });
    expect(next).not.toBeCalled();
  });

  it("returns '422' if value of one of the parameters is not correct", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const request = {
      query: { param: true }
    };
    const response: any = {
      status
    };
    const next = jest.fn();

    const middleware = getValidationErrorMessageSenderMiddleware(
      request as Request,
      response as Response,
      next as NextFunction
    );

    const otherError = 'other error'
    middleware(new Error('other error'));

    expect.assertions(3);
    expect(status).toHaveBeenCalledWith(422);
    expect(send).toBeCalledWith({ message: otherError });
    expect(next).not.toBeCalled();
  });

});
