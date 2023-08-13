export default class Exception extends Error {
  public status = 400;

  constructor({ message, status }: { message: string; status?: number }) {
    super(message);
    if (status) this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
