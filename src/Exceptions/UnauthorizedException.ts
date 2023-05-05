import { Exception } from "./Exception";

export class UnauthorizedException extends Exception {
  public message: string = "Unauthorized";
  public status: number = 401;
}
