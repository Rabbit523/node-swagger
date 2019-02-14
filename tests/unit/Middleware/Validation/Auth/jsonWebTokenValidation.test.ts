import { getJsonWebTokenValidationMiddleware } from "../../../../../src/Middleware/Validation/Auth/jsonWebTokenValidation";

const ERROR_MESSAGE = 'Error'
const mockJsonWebTokenValidationErrorObject = {
    auth: false,
    message: ERROR_MESSAGE
}
const mockJsonWebToken = '1234'

describe(`jsonWebTokenValidationMiddleware`, () => {
  it("checks when response.locals.jsonWebToken is defined next function is called", () => {
  
    const response: any = { locals: { jsonWebToken: mockJsonWebToken} };

    const request: any = { }
    const next = jest.fn();

    const middleware = getJsonWebTokenValidationMiddleware(mockJsonWebTokenValidationErrorObject);
    middleware(request, response, next)

    expect.assertions(1);
    expect(next).toBeCalledWith()
  });

  it("checks that when jsonWebToken is undefined an error response is sent", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));
    const response: any = { locals: { }, status };
    const request: any = { }
    const next = jest.fn();

    const middleware = getJsonWebTokenValidationMiddleware(mockJsonWebTokenValidationErrorObject);
    middleware(request, response, next)

    expect.assertions(3);
    expect(status).toBeCalledWith(401)
    expect(send).toBeCalledWith(mockJsonWebTokenValidationErrorObject)
    expect(next).not.toBeCalled()
  })

  it("should call next with an error on failure", () => {
   
    const status = jest.fn(() => ({ send }));
    const send = jest.fn(() => {
        throw new Error(ERROR_MESSAGE)
    })
    const response: any = { locals: { }, status};

    const request: any = { }
    const next = jest.fn();

    const middleware = getJsonWebTokenValidationMiddleware(mockJsonWebTokenValidationErrorObject);
    middleware(request, response, next)

    expect.assertions(1);
    expect(next).toBeCalledWith(new Error(ERROR_MESSAGE))
  })



});