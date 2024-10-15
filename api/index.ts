import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { AppError, HttpCode } from "../src/appError";
import router from "../src/router/index";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("server running on http://localhost:8080/");
});

app.use("/api", router());

app.use((req, res, next) => {
  const error = new AppError({
    description: "Not found",
    statusCode: HttpCode.NOT_FOUND,
  });

  next(error);
});

app.use(
  (
    error: AppError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    res.status(error.statusCode || 500);

    res.json({
      error: {
        message: error.message,
      },
    });
  }
);

module.exports = app;
