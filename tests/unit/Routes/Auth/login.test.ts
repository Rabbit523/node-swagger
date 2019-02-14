import { loginMiddlewares } from "../../../../src/Routes/Auth/login";
import { loginRequestValidationMiddleware } from "../../../../src/Middleware/Validation/Auth/loginRequestValidationMiddleware";
import { retreiveUserWithEmailMiddleware } from "../../../../src/Middleware/Database/retreiveUserWithEmailMiddleware";
import { userExistsValidationMiddleware } from "../../../../src/Middleware/Validation/User/userExistsValidationMiddleware"
import { compareRequestPasswordToUserHashedPasswordMiddleware } from "../../../../src/Middleware/Password/compareRequestPasswordToUserHashedPasswordMiddleware";
import { passwordsMatchValidationMiddleware } from "../../../../src/Middleware/Validation/User/passwordsMatchValidationMiddleware";
import { loginSuccessfulMiddleware } from "../../../../src/Middleware/Auth/loginSuccessfulMiddleware";
import { setMinimumUserDataMiddleware } from "../../../../src/Middleware/User/setMinimumUserDataMiddleware";
import { setJsonWebTokenMiddleware } from "../../../../src/Middleware/Auth/signJsonWebTokenMiddleware";

const fileName = "user.login";

describe(`${fileName}`, () => {
  it("check that exported array contains the necessary middlewares in the correct order", () => {
    expect.assertions(1);
    expect(loginMiddlewares).toEqual([
        loginRequestValidationMiddleware,
        retreiveUserWithEmailMiddleware,
        userExistsValidationMiddleware,
        compareRequestPasswordToUserHashedPasswordMiddleware,
        passwordsMatchValidationMiddleware,
        setMinimumUserDataMiddleware,
        setJsonWebTokenMiddleware,
        loginSuccessfulMiddleware
    ]);
  });
});
