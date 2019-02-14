import { getRetreiveJsonWebTokenMiddleware, jsonWebTokenHeaderName } from '../../../../src/Middleware/Auth/retreiveJsonWebTokenMiddleware';

describe('retreiveJsonWebTokenMiddleware', () => {
  it('should set response.locals.jsonWebToken', () => {

    const jsonWebTokenHeaderNameMock = 123;

    const response: any = { locals: {} };
    const request: any = { headers: { [jsonWebTokenHeaderName]: jsonWebTokenHeaderNameMock } };
    const next = jest.fn();

    const middleware = getRetreiveJsonWebTokenMiddleware(jsonWebTokenHeaderName);
    middleware(request, response, next);

    expect.assertions(2);
    expect(response.locals.jsonWebToken).toBeDefined();
    expect(next).toBeCalled();
  });

  it('should call next with an error on failure', () => {

    const response: any = { locals: { } };
    const request: any = { };
    const next = jest.fn();

    const middleware = getRetreiveJsonWebTokenMiddleware(jsonWebTokenHeaderName);
    middleware(request, response, next);

    expect.assertions(1);
    expect(next).toBeCalledWith(new TypeError("Cannot read property 'x-access-token' of undefined"));
  });

});
