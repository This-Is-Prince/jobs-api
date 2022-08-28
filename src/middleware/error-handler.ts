import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors";

const errorHandlerMiddleware: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

export default errorHandlerMiddleware;
