import { loginRequestValidationMiddleware } from "../../Middleware/Validation/Auth/loginRequestValidationMiddleware";
import { retreiveUserWithEmailMiddleware } from "../../Middleware/Database/retreiveUserWithEmailMiddleware";
import { userExistsValidationMiddleware } from "../../Middleware/Validation/User/userExistsValidationMiddleware";
import { compareRequestPasswordToUserHashedPasswordMiddleware } from "../../Middleware/Password/compareRequestPasswordToUserHashedPasswordMiddleware";
import { passwordsMatchValidationMiddleware } from "../../Middleware/Validation/User/passwordsMatchValidationMiddleware";
import { loginSuccessfulMiddleware } from "../../Middleware/Auth/loginSuccessfulMiddleware";
import { setMinimumUserDataMiddleware } from "../../Middleware/User/setMinimumUserDataMiddleware";
import { setJsonWebTokenMiddleware } from "../../Middleware/Auth/signJsonWebTokenMiddleware";

export const loginMiddlewares = [
  loginRequestValidationMiddleware,
  retreiveUserWithEmailMiddleware,
  userExistsValidationMiddleware,
  compareRequestPasswordToUserHashedPasswordMiddleware,
  passwordsMatchValidationMiddleware,
  setMinimumUserDataMiddleware,
  setJsonWebTokenMiddleware,
  loginSuccessfulMiddleware
];


