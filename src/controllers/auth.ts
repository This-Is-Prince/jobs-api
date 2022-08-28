import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequest, UnauthenticatedError } from "../errors";
import User from "../models/User";

const register: RequestHandler = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const user = await User.findOne({ email });
  // compare password
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ token });
};

export { register, login };
