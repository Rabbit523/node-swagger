import { sendFormattedUserMiddleware } from "../../../../src/Middleware/User/sendFormattedUserMiddleware";

const ERROR_MESSAGE = "error";

describe(`sendFormattedUserMiddleware`, () => {
  it("should send user in response with password undefined", () => {
  
    const mockUserName = 'abc'
    const mockEmail = 'email@gmail.com'
    const mockPassword = '12345678'
    
    const savedUser = { userName: mockUserName, email: mockEmail, password: mockPassword}
    const send = jest.fn()
    const response: any = { locals: {savedUser }, send };

    const request: any = { }
    const next = jest.fn();

    sendFormattedUserMiddleware(request, response, next);

    expect.assertions(3);
    expect(response.locals.savedUser.password).toBeUndefined()
    expect(next).not.toBeCalled()
    expect(send).toBeCalledWith({userName: mockUserName, email: mockEmail})
  });

  it("should call next with an error on failure", () => {
    const mockUserName = 'abc'
    const mockEmail = 'email@gmail.com'
    const mockPassword = '12345678'
    
    const savedUser = { userName: mockUserName, email: mockEmail, password: mockPassword}
    const send = jest.fn(() => {
        throw new Error(ERROR_MESSAGE)
    })
    const response: any = { locals: {savedUser }, send };

    const request: any = { }
    const next = jest.fn();

    sendFormattedUserMiddleware(request, response, next);

    expect.assertions(1);
    expect(next).toBeCalledWith(new Error(ERROR_MESSAGE))
  })


});