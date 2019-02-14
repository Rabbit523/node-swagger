import { Request, Response, NextFunction } from "express";
import {
  getPasswordsMatchValidationMiddleware
} from "../../../../../src/Middleware/Validation/User/passwordsMatchValidationMiddleware";

const loginError = 'login details are incorrect'
const errorMessage = 'error'

describe(`passwordsMatchValidationMiddleware`, () => {
  it("check that error response is returned correctly when passwords don't match", async () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const request = { };
    const response: any = {
      locals: { passwordMatchesHash: false},
      status
    };
    const next = jest.fn();

    const middleware =  getPasswordsMatchValidationMiddleware(loginError);

    await middleware(request as Request, response as Response, next as NextFunction);

    expect.assertions(2);
    expect(status).toHaveBeenCalledWith(400);
    expect(send).toBeCalledWith({message: loginError});
  });

  it("check that next is called when passwordMatchesHash is true", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const request = { };
    const response: any = {
      locals: { passwordMatchesHash: true },
      status
    };
    const next = jest.fn();

    const middleware =  getPasswordsMatchValidationMiddleware(loginError);

    middleware(request as Request, response as Response, next as NextFunction);

    expect.assertions(3);
    expect(status).not.toHaveBeenCalled();
    expect(send).not.toBeCalled();
    expect(next).toBeCalled();
  });

  it("check that when error is thrown next is called with err", () => {
    const send = jest.fn(() => {throw new Error(errorMessage)});
    const status = jest.fn(() => ({ send }));


    const request = {};
    const response: any = {
      locals: { passwordMatchesHash: false },
      status
    };
    const next = jest.fn();

    const middleware =  getPasswordsMatchValidationMiddleware(loginError)

    middleware(request as Request, response as Response, next as NextFunction);

    expect.assertions(1);
    expect(next).toBeCalledWith(new Error(errorMessage));
  });
});
