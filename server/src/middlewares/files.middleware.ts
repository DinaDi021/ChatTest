import { NextFunction, Request, Response } from "express";

import { imageConfig } from "../configs/file.config";
import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";

class FilesMiddleware {
  public async isAvatarValid(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (Array.isArray(req.files.avatar)) {
        throw new ApiError(
          "Avatar is not allowed to be an array of images",
          400,
        );
      }

      const { size, mimetype } = req.files.avatar;

      if (size > imageConfig.MAX_SIZE) {
        throw new ApiError("File is too big", 400);
      }

      if (!imageConfig.MIMETYPES.includes(mimetype)) {
        throw new ApiError("File has invalid format", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  isAvatarExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const user = await userRepository.getUserById(userId);
      if (user && user.avatar) {
        res.locals.avatar = user.avatar;
        next();
      } else {
        res.status(404).json({ message: "Avatar not found" });
      }
    } catch (error) {
      next(error);
    }
  };
}

export const fileMiddleware = new FilesMiddleware();
