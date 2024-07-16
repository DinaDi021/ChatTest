import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import https from "http";
import path from "path";
import { Server } from "socket.io";

import { configs } from "./configs/configs";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { messageRouter } from "./routers/message.router";
import { userRouter } from "./routers/user.router";
import { UserSocketMap } from "./types/userSocketMap";

dotenv.config();

const app = express();
const server = https.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: configs.FRONT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

app.use(
  cors({
    origin: configs.FRONT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: UserSocketMap = {};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

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

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(configs.PORT, async () => {
  console.log(`has started ${configs.PORT}`);
});
