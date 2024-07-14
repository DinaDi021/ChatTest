import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { getConfigForMimeType, imageConfig } from "../configs/file.config";
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

  public async isAvatarExist(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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
  }

  public async isFileValid(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.files) {
        req.files = {};
        next();
        return;
      }

      const files = Array.isArray(req.files.files)
        ? req.files.files
        : [req.files.files];

      await Promise.all(
        files.map(async (file: UploadedFile) => {
          const { size, mimetype } = file;

          const config = getConfigForMimeType(mimetype);
          if (!config) {
            throw new ApiError("Unsupported file type", 400);
          }

          if (size > config.MAX_SIZE) {
            throw new ApiError("File is too big", 400);
          }
        }),
      );

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FilesMiddleware();
