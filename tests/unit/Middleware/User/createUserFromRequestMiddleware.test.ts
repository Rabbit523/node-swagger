import { getCreateUserFromRequestMiddleware } from "../../../../src/Middleware/User/createUserFromRequestMiddleware";

describe(`createUserFromRequestMiddleware`, () => {
  it("should define response.locals.newUser", async () => {
    const hashedPassword = "12$4354";
    const userName = 'user'
    const email = 'user@gmail.com'
  
    class User {
        userName: string;
        email: string;
        password: string; 

        constructor({userName, email, password}){
            this.userName = userName;
            this.email = email;
            this.password = password
        }
    }
 
    const response: any = { locals: {hashedPassword } };
    const request: any = { body: { userName, email } };
    const next = jest.fn();

    const middleware = getCreateUserFromRequestMiddleware(User)

    await middleware(request, response, next);

    expect.assertions(1);
    const newUser = new User({userName, email, password: hashedPassword})
    expect(response.locals.newUser).toEqual(newUser)
  });

});