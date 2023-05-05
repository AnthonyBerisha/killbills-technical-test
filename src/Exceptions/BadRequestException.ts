import { Exception } from "./Exception";

export class BadRequestException extends Exception {
  public message: string = "Bad Request";
  public status: number = 400;
}
