import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import http from "http";

import { configs } from "./configs/configs";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { messageRouter } from "./routers/message.router";
import { userRouter } from "./routers/user.router";

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: configs.FRONT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/messages", messageRouter);

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
