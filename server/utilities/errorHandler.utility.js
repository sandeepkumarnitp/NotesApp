class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);// jaha error hota hai wahi direct chla jata hai
  }
}
export const errorHandler = ErrorHandler;