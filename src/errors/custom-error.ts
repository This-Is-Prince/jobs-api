import { StatusCodes } from "http-status-codes";

class CustomError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.OK;
  }
}

export default CustomError;
