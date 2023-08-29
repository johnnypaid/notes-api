import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import env from "./util/validateenv";
import { routes } from "./routes/notes";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

// db connection
mongoose
  .connect(env.MONGO_CONN_STR)
  .then(() => console.log("Connected to db"))
  .catch(console.error);

// midlleware
app.use(express.json());
app.use(morgan("dev"));

// routes
routes(app);

// error handler
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint does't exist"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "Something went wrong";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});
// end error handler

const port = env.PORT;

app.listen(port, () => console.log(`Server running at ${port}`));
