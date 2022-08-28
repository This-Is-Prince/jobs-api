import { Router } from "express";
import { login, register } from "../controllers/auth";

const authRouter = Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);

export default authRouter;
