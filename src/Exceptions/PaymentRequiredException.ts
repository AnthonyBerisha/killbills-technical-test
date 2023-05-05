export class PaymentRequiredException extends Error {
  public message: string = "Payment Required";
  public status: number = 402;
}
