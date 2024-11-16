import _ from "lodash";
import { AppError } from "../utils/appError.js";

//Error handlers
const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}, 400`);

const handleDuplicateFieldDB = (err) => {
  const value = err.keyValue
    ? JSON.stringify(err.keyValue)
    : err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  return new AppError(
    `Duplicate field value:${value}. please use another value`,
    400
  );
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Invalid input data:${errors.join(". ")}`, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token, please login again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired, please login again", 401);

// Centralized Error Handler Lookup
const errorHandlers = {
  CastError: handleCastErrorDB,
  ValidationError: handleValidationErrorDB,
  JsonWebTokenError: handleJWTError,
  TokenExpiredError: handleJWTExpiredError,
};

const handleError = (err) => {
  const handler = errorHandlers[err.name];
  return handler ? handler(err) : err;
};

const sendErrorDev = (err, req, res) => {
  console.log("Error handling triggered for URL:", req.originalUrl);
  console.log("Error details:", err);
  //Api error
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //Rendered website error
  console.error("Error 💥", err.name);
  console.error("Full error details:", err);

  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error("ERROR 💥", err);
    // 2) Send generic message
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error("ERROR 💥", err);
  // 2) Send generic message
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later.",
  });
};

// Error Cloning Utility
const cloneError = (err) => {
  if (err instanceof AppError) return err;
  const cloned = _.pick(err, [
    "message",
    "statusCode",
    "name",
    "isOperational",
    "path",
    "value",
    "code",
    "errmsg",
    "errors",
  ]);
  cloned.statusCode = cloned.statusCode || 500;
  cloned.status = cloned.status || "error";
  return cloned;
};

// Main Error Handler
const globalErrorHandler = (err, req, res, next) => {
  console.log("Caught Error:", err.statusCode);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    console.log("env", process.env.NODE_ENV);
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = cloneError(err);

    // Map known error types
    error = handleError(error);

    // MongoDB duplicate key errors (code 11000)
    if (error.code === 11000) error = handleDuplicateFieldDB(error);

    sendErrorProd(error, req, res);
  }
};

export default globalErrorHandler;
