import "express-async-errors";
import { config } from "dotenv";
// env variables
config();

import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

import express from "express";
// app
const app = express();

import authRouter from "./routes/auth";
import jobsRouter from "./routes/jobs";

import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import connectDB from "./db";
import authMiddleware from "./middleware/authentication";

// middleware
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

// error middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// port
const port = process.env.PORT || 3000;
// start
const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
