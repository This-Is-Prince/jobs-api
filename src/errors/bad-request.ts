import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error";

class BadRequest extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
