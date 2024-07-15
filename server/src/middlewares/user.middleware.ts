import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";

class UserMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await userRepository.getUserById(userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      req.res.locals = user;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isEmailUniq(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await userRepository.getOneByEmail({ email });
      if (user) {
        throw new ApiError("Email already exist", 409);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await userRepository.getOneByEmail({ email });

      if (!user) {
        throw new ApiError("Email doesn't exist", 409);
      }

      req.res.locals.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
