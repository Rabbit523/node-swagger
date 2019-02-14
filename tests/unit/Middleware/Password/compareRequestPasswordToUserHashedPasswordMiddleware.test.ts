import { getCompareRequestPasswordToUserHashedPasswordMiddleware } from "../../../../src/Middleware/Password/compareRequestPasswordToUserHashedPasswordMiddleware";

const ERROR_MESSAGE = "error";

const mockedPassword = "password";
const mockedHash = '1234'

describe(`compareRequestPasswordToUserHashedPasswordMiddleware`, () => {
  it("should set response.locals.passwordMatchesHash to true when the request password matches the user hash", async () => {
   
    const compare = jest.fn(() => {
      return Promise.resolve(true);
    });

    const middleware = getCompareRequestPasswordToUserHashedPasswordMiddleware(compare);
    const response: any = { locals: {user: { password: mockedHash}} };
    const request: any = { body: { password: mockedPassword } };
    const next = jest.fn();

    await middleware(request, response, next);

    expect.assertions(3);
    expect(compare).toBeCalledWith(mockedPassword, mockedHash);
    expect(response.locals.passwordMatchesHash).toBe(true);
    expect(next).toBeCalled();
  });

  it("should set response.locals.passwordMatchesHash to false when the request password does not match the user hash", async () => {
    const compare = jest.fn(() => {
      return Promise.resolve(false);
    });

    const middleware = getCompareRequestPasswordToUserHashedPasswordMiddleware(compare);
    const response: any = { locals: {user: { password: mockedHash}} };
    const request: any = { body: { password: mockedPassword } };
    const next = jest.fn();

    await middleware(request, response, next);

    expect.assertions(3);
    expect(compare).toBeCalledWith(mockedPassword, mockedHash);
    expect(response.locals.passwordMatchesHash).toBe(false);
    expect(next).toBeCalled();
  })

  it("should call next() with err paramater if compare fails", async () => {
 
    const compare = jest.fn(() => {
      return Promise.reject(ERROR_MESSAGE);
    });
    

    const middleware = getCompareRequestPasswordToUserHashedPasswordMiddleware(compare);
    const response: any = { locals: { user: { password: mockedHash}} };
    const request: any = { body: { password: mockedPassword } };
    const next = jest.fn();

    await middleware(request, response, next);

    expect.assertions(3);
    expect(compare).toBeCalledWith(mockedPassword, mockedHash);
    expect(response.locals.passwordMatchesHash).not.toBeDefined();
    expect(next).toBeCalledWith(ERROR_MESSAGE);
  });
});
