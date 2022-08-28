import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";
import User from "../models/User";
interface JwtPayload {
  userId: string;
  name: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: { userId: string; name: string };
    }
  }
}

const authMiddleware: RequestHandler = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authorization?.split(" ")[1];
  try {
    const { userId, name } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    // attach the user to the job routes
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default authMiddleware;
