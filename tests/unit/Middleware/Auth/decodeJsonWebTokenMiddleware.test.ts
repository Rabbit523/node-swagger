import { getDecodeJsonWebTokenMiddleware } from '../../../../src/Middleware/Auth/decodeJsonWebTokenMiddleware';

const ERROR_MESSAGE = 'error';

describe('decodeJsonWebTokenMiddleware', () => {
  it('should set response.locals.token', async () => {
    const tokenMock = '1234';
    const verifyMock = jest.fn(() => true);
    const jwtSecretMock = '1234';
    const response: any = { locals: { jsonWebToken: tokenMock } };
    const request: any = {};
    const next = jest.fn();

    const middleware = getDecodeJsonWebTokenMiddleware(verifyMock, jwtSecretMock);
    await middleware(request, response, next);

    expect.assertions(3);
    expect(verifyMock).toBeCalledWith(tokenMock, jwtSecretMock);
    expect(response.locals.decodedToken).toBeDefined();
    expect(next).toBeCalled();
  });

  it('should call next with an error on failure', async () => {
    const verifyMock = jest.fn(() => {
      throw new Error(ERROR_MESSAGE);
    });
    const tokenMock = '1234';
    const jwtSecretMock = '1234';

    const response: any = { locals: { jsonWebToken: tokenMock } };
    const request: any = {};
    const next = jest.fn();

    const middleware = getDecodeJsonWebTokenMiddleware(verifyMock, jwtSecretMock);
    await middleware(request, response, next);

    expect.assertions(1);
    expect(next).toBeCalledWith(new Error(ERROR_MESSAGE));
  });

});
