import { Exception } from "./Exception";

export class PaymentRequiredException extends Exception {
  public message: string = "Payment Required";
  public status: number = 402;
}
