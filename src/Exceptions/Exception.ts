export abstract class Exception extends Error {
  public abstract message: string;
  public abstract status: number;
}
