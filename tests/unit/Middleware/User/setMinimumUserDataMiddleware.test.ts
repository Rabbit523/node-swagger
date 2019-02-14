import { setMinimumUserDataMiddleware } from "../../../../src/Middleware/User/setMinimumUserDataMiddleware";

describe(`setMinimumUserDataMiddleware`, () => {
  it("should set response.locals.minimumUserData", () => {
  
    const mockUserName = 'abc'
    const mockId = '12345678'
    
    const mockUser = { userName: mockUserName, _id: mockId}
    const response: any = { locals: {user: mockUser }};

    const request: any = { }
    const next = jest.fn();

    setMinimumUserDataMiddleware(request, response, next);

    expect.assertions(4);
    expect(response.locals.minimumUserData).toBeDefined()
    expect(response.locals.minimumUserData._id).toBeDefined()
    expect(response.locals.minimumUserData.userName).toBeDefined()
    expect(next).toBeCalled()
  });

  it("should call next with an error on failure because response.locals.user is not defined", () => {
    
    const response: any = { locals: { } };

    const request: any = { }
    const next = jest.fn();

    setMinimumUserDataMiddleware(request, response, next);

    expect.assertions(1);
    expect(next).toBeCalledWith(new TypeError(`Cannot read property '_id' of undefined`))
  })


});