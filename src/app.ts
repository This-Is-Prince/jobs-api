import "express-async-errors";
import { config } from "dotenv";
// env variables
config();

import express from "express";
// app
const app = express();

import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.send("jobs api");
});

// error middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// port
const port = process.env.PORT || 3000;
// start
const start = async () => {
  try {
    // connectDB
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
