import { loginRequestValidationMiddleware }  from '../../../../../src/Middleware/Validation/Auth/loginRequestValidationMiddleware'

const mockEmail = 'mock@gmail.com'
const mockPassword = '12345678'

describe(`loginRequestValidationMiddlware`, () => {

  it("check that valid request passes", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const request: any = {
      body: { email: mockEmail, password: mockPassword }
    };
    const response: any = {
      status
    };
    const next = jest.fn();

    loginRequestValidationMiddleware(request, response, next);

    expect.assertions(1);
    expect(next).toBeCalled();
  });


  it("check that correct response is sent when email is missing", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const request: any = {
      body: { password: mockPassword }
    };
    const response: any = {
      status
    };
    const next = jest.fn();

    loginRequestValidationMiddleware(request, response, next);

    expect.assertions(3);
    expect(status).toHaveBeenCalledWith(422);
    expect(send).toBeCalledWith({"message": "child \"email\" fails because [\"email\" is required]"});
    expect(next).not.toBeCalled();
  });

  it("check that correct response is sent when email is incorrect", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const incorrectEmail = '1234'

    const request: any = {
      body: { email: incorrectEmail, password: mockPassword }
    };
    const response: any = {
      status
    };
    const next = jest.fn();

    loginRequestValidationMiddleware(request, response, next);

    expect.assertions(3);
    expect(status).toHaveBeenCalledWith(422);
    expect(send).toBeCalledWith({"message": "child \"email\" fails because [\"email\" must be a valid email]"});
    expect(next).not.toBeCalled();
  });

  it("check that correct response is sent when password is missing", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const request: any = {
      body: { email: mockEmail }
    };
    const response: any = {
      status
    };
    const next = jest.fn();

    loginRequestValidationMiddleware(request, response, next);

    expect.assertions(3);
    expect(status).toHaveBeenCalledWith(422);
    expect(send).toBeCalledWith({"message": "child \"password\" fails because [\"password\" is required]"});
    expect(next).not.toBeCalled();
  });

  it("check that correct response is sent when password is too short", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const incorrectPassword = '123'

    const request: any = {
      body: { email: mockEmail, password: incorrectPassword }
    };
    const response: any = {
      status
    };
    const next = jest.fn();

    loginRequestValidationMiddleware(request, response, next);

    expect.assertions(3);
    expect(status).toHaveBeenCalledWith(422);
    expect(send).toBeCalledWith({"message": "child \"password\" fails because [\"password\" length must be at least 6 characters long]"});
    expect(next).not.toBeCalled();
  });

  it("check that not allowed parameter is caught", () => {
    const send = jest.fn();
    const status = jest.fn(() => ({ send }));

    const notAllowed = '123'

    const request: any = {
      body: { notAllowed, email: mockEmail, password: mockPassword }
    };
    const response: any = {
      status
    };
    const next = jest.fn();

    loginRequestValidationMiddleware(request, response, next);

    expect.assertions(3);
    expect(status).toHaveBeenCalledWith(400);
    expect(send).toBeCalledWith({"message": "\"notAllowed\" is not allowed"});
    expect(next).not.toBeCalled();
  });

  
});
