import { Request, Response, NextFunction } from "express";
import {
  getUserExistsValidationMiddleware,
} from "../../../../../src/Middleware/Validation/User/userExistsValidationMiddleware";

const mockErrorMessage = 'User does not exist'

describe(`userExistsValidationMiddleware`, () => {
  it("check that error response is returned correctly when user wasn't found", async () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));
 
    const request = {};
    const response: any = {
      locals: {},
      status
    };
    const next = jest.fn();

    const middleware = getUserExistsValidationMiddleware(mockErrorMessage);

    middleware(request as Request, response as Response, next as NextFunction);

    expect.assertions(2);
    expect(status).toHaveBeenCalledWith(400);
    expect(send).toBeCalledWith({message: mockErrorMessage});
  });

  it("check that next is called when user is defined on response.locals", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const request = { };
    const response: any = {
      locals: { user: true },
      status
    };
    const next = jest.fn();

    const middleware = getUserExistsValidationMiddleware(mockErrorMessage);

    middleware(request as Request, response as Response, next as NextFunction);

    expect.assertions(3);
    expect(status).not.toHaveBeenCalled();
    expect(send).not.toBeCalled();
    expect(next).toBeCalled();
  });

  it("check that next is called with err on send failure", () => {
      const errorMessage = 'error'
    const send = jest.fn(() => {throw new Error(errorMessage)});
    const status = jest.fn(() => ({ send }));
    const generateAlreadyExistsMessage = jest.fn();

    const request = { };
    const response: any = {
      locals: { user: false },
      status
    };
    const next = jest.fn();

    const middleware =  getUserExistsValidationMiddleware(mockErrorMessage);

    middleware(request as Request, response as Response, next as NextFunction);

    expect.assertions(1);
    expect(next).toBeCalledWith(new Error(errorMessage));
  });
});
