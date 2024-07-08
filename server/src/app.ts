import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import http from "http";

import { configs } from "./configs/configs";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();
const server = http.createServer(app);

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;

  res.status(status).json({
    message: error.message,
    status: error.status,
  });
});

server.listen(configs.PORT, async () => {
  console.log(`has started ${configs.PORT}`);
});
