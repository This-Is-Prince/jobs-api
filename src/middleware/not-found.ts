import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundMiddleware: RequestHandler = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("<h1>Route does not exist</h1>");
};

export default notFoundMiddleware;
