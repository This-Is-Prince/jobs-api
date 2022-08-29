import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
// import { CustomError } from "../errors";

const errorHandlerMiddleware: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
  // if (err instanceof CustomError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
