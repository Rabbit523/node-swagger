import { getLoginSuccessfulMiddleware } from "../../../../src/Middleware/Auth/loginSuccessfulMiddleware";

const ERROR_MESSAGE = "error";
const loginSuccessMessage = 'success'

describe(`loginSuccessfulMiddleware`, () => {
  it("should should send login success message", () => {
      
    const send = jest.fn()
    const mockToken = '1234'
    const response: any = { locals: {jsonWebToken: mockToken}, send };

    const request: any = { }
    const next = jest.fn();

    
    const middleware = getLoginSuccessfulMiddleware(loginSuccessMessage);
    middleware(request, response, next)

    expect.assertions(2);
    expect(next).not.toBeCalled()
    expect(send).toBeCalledWith({message: loginSuccessMessage, jsonWebToken: mockToken})
  });

  it("should call next with an error on failure", () => {

    const mockToken = '1234'
    const send = jest.fn(() => {
        throw new Error(ERROR_MESSAGE)
    })
    const response: any = { send, locals: {jsonWebToken: mockToken} };

    const request: any = { }
    const next = jest.fn();

    const middleware = getLoginSuccessfulMiddleware(loginSuccessMessage);
    middleware(request, response, next)

    expect.assertions(1);
    expect(next).toBeCalledWith(new Error(ERROR_MESSAGE))
  })


});