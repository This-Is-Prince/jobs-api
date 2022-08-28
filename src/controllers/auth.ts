import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";

const register: RequestHandler = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT(user._id.toString(), user.name);

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login: RequestHandler = async (req, res) => {
  res.send("login user");
};

export { register, login };
