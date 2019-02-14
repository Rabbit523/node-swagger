import {getHashPasswordMiddleware } from "../../../../src/Middleware/Password/hashPasswordMiddleware";

const ERROR_MESSAGE = "error";

describe(`hashPasswordMiddleware`, () => {
  it("should set response.locals.hashedPassword", async () => {
    const mockedPassword = "password";
    const hashedPassword = "12$4354";
    const saltMock = 10;
    const hash = jest.fn(() => {
      return Promise.resolve(hashedPassword);
    });

    const middleware = getHashPasswordMiddleware(hash, saltMock);
    const response: any = { locals: {} };
    const request: any = { body: { password: mockedPassword } };
    const next = jest.fn();

    await middleware(request, response, next);

    expect.assertions(3);
    expect(hash).toBeCalledWith(mockedPassword, saltMock);
    expect(response.locals.hashedPassword).toBe(hashedPassword);
    expect(next).toBeCalled();
  });

  it("should call next() with err paramater if hash password call fails", async () => {
    const mockedPassword = "password";
    const hashedPassword = "12$4354";
    const saltMock = 10;
    const hash = jest.fn(() => {
      return Promise.reject(ERROR_MESSAGE);
    });
    

    const middleware = getHashPasswordMiddleware(hash, saltMock);
    const response: any = { locals: {} };
    const request: any = { body: { password: mockedPassword } };
    const next = jest.fn();

    await middleware(request, response, next);

    expect.assertions(3);
    expect(hash).toBeCalledWith(mockedPassword, saltMock);
    expect(response.locals.hashedPassword).not.toBeDefined();
    expect(next).toBeCalledWith(ERROR_MESSAGE);
  });
});
