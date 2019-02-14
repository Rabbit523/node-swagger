export class ErrorMessageHelper {
    public static generateAlreadyExistsMessage(key: string, value: string){
        return `User with ${key}: '${value}' already exists`
      }
}