export class UnauthorizedException extends Error {
  public message: string = "Unauthorized";
  public status: number = 401;
}
