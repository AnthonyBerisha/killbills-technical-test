export class BadRequestException extends Error {
  public message: string = "Bad Request";
  public status: number = 400;
}
