import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";

class EmailMiddleware {
  public async isEmailVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload;

      const user = await userRepository.getUserById(userId);

      if (!user.emailVerified) {
        throw new ApiError(
          "You can't send message. Please activate your email",
          403,
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isEmailExist(req: Request, res: Response, next: NextFunction) {
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
}

export const emailMiddleware = new EmailMiddleware();
