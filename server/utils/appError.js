export const getStatus = (statusCode) => {
  if (statusCode >= 400 && statusCode < 500) return "fail";
  return "error";
};

export class AppError extends Error {
  constructor(message, statusCode) {
    console.log("status CODE", statusCode);
    super(message);
    this.statusCode = statusCode;
    this.status = getStatus(statusCode);
    console.log("status", this.status);

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
