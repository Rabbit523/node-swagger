import { ErrorMessageHelper } from "../../../src/Utils/errorMessage.helper";

const className = "ErrorMessageHelper";
const classMethods = {
  generateAlreadyExistsMessage: "generateAlreadyExistsMessage"
};

describe(`${className}`, () => {
  describe(`${classMethods.generateAlreadyExistsMessage}`, () => {
    it("should return correct error message", () => {
      expect.assertions(1);
      const userNameKey = "userName";
      const userName = "tester";
      const errorMessage = ErrorMessageHelper.generateAlreadyExistsMessage(
        userNameKey,
        userName
      );
      expect.assertions(1);
      expect(errorMessage).toBe(
        `User with ${userNameKey}: '${userName}' already exists`
      );
    });
  });
});
