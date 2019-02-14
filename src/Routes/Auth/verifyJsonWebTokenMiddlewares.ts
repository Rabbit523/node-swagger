import { retreiveJsonWebTokenMiddleware } from "../../Middleware/Auth/retreiveJsonWebTokenMiddleware";
import { jsonWebTokenValidationMiddleware } from "../../Middleware/Validation/Auth/jsonWebTokenValidation";
import { decodeJsonWebTokenMiddleware } from "../../Middleware/Auth/decodeJsonWebTokenMiddleware";
import { getLoginSuccessfulMiddleware } from "../../Middleware/Auth/loginSuccessfulMiddleware";

export const verifyJsonWebTokenMiddlewares = [
    retreiveJsonWebTokenMiddleware,
    jsonWebTokenValidationMiddleware,
    decodeJsonWebTokenMiddleware,
    getLoginSuccessfulMiddleware
]