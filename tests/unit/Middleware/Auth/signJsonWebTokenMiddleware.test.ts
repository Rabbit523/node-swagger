import { getSignJsonWebTokenMiddleware } from '../../../../src/Middleware/Auth/signJsonWebTokenMiddleware';

const ERROR_MESSAGE = 'error';

describe('setJsonWebTokenMiddleware', () => {
  it('should set response.locals.token', () => {
    const minimumUserData = { userName: 'user' };
    const signTokenMock = jest.fn(() => true);
    const jwtSecretMock = '1234';
    const jwtOptionsMock = {};
    const response: any = { locals: { minimumUserData } };
    const request: any = { };
    const next = jest.fn();

    const middleware = getSignJsonWebTokenMiddleware(signTokenMock, jwtSecretMock, jwtOptionsMock);
    middleware(request, response, next);

    expect.assertions(3);
    expect(signTokenMock).toBeCalledWith({ minimumUserData }, jwtSecretMock, jwtOptionsMock);
    expect(response.locals.jsonWebToken).toBeDefined();
    expect(next).toBeCalled();
  });

  it('should call next with an error on failure', () => {

    const signTokenMock = jest.fn(() => {
      throw new Error(ERROR_MESSAGE);
    });
    const minimumUserData = { userName: 'user' };
    const jwtSecretMock = '1234';
    const jwtOptionsMock = {};

    const response: any = { locals: { minimumUserData } };
    const request: any = { };
    const next = jest.fn();

    const middleware = getSignJsonWebTokenMiddleware(signTokenMock, jwtSecretMock, jwtOptionsMock);
    middleware(request, response, next);

    expect.assertions(1);
    expect(next).toBeCalledWith(new Error(ERROR_MESSAGE));
  });

});
