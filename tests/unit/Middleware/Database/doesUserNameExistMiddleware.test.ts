import { getDoesUserNameExistMiddleware  } from "../../../../src/Middleware/Database/doesUserNameExistMiddleware";

const mockUserName = "testname";

const ERROR_MESSAGE = "error";

describe(`doesUserNameExistMiddleware`, () => {

  it("should set userNameExists to true when userExists", async () => {
    const findOne = jest.fn(() => Promise.resolve(true));
    const UserModel = {
      findOne
    }
    const request: any = { body: { userName: mockUserName } };
    const response: any = { locals: {} };
    const next = jest.fn();

    const middleware = getDoesUserNameExistMiddleware(UserModel);

    await middleware(request, response, next);

    expect.assertions(3);
    expect(findOne).toBeCalledWith({ userName: mockUserName });
    expect(response.locals.userNameExists).toBe(true);
    expect(next).toBeCalledWith();
  });

  it("should set userNameExists to false when user doesn't exist", async () => {
    const findOne = jest.fn(() => Promise.resolve(false));
    const UserModel = {
      findOne
    }
    const request: any = { body: { userName: mockUserName } };
    const response: any = { locals: {} };
    const next = jest.fn();

    const middleware = getDoesUserNameExistMiddleware (UserModel);

    await middleware(request, response, next);

    expect.assertions(3);
    expect(findOne).toBeCalledWith({ userName: mockUserName });
    expect(response.locals.userNameExists).toBe(undefined);
    expect(next).toBeCalledWith();
  });

  it("should call next() with err paramater if database call fails", async () => {
    const findOne = jest.fn(() => Promise.reject(ERROR_MESSAGE));
    const UserModel = {
      findOne
    }
    const request: any = { body: { userName: mockUserName} };
    const response: any = { locals: {} };
    const next = jest.fn();

    const middleware = getDoesUserNameExistMiddleware (UserModel);

    await middleware(request, response, next);

    expect.assertions(3);
    expect(findOne).toBeCalledWith({ userName: mockUserName });
    expect(response.locals.userNameExists).toBe(undefined);
    expect(next).toBeCalledWith(ERROR_MESSAGE);
  });
});
