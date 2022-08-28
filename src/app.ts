import "express-async-errors";
import { config } from "dotenv";
// env variables
config();

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
app.use(express.json());

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
