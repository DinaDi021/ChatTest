import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        throw new ApiError("No access token", 401);
      }

      const jwtPayload = tokenService.checkToken(accessToken, "access");

      req.res.locals.jwtPayload = jwtPayload;
      req.res.locals.accessToken = accessToken;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new ApiError("No refresh token", 401);
      }

      const jwtPayload = tokenService.checkToken(refreshToken, "refresh");

      req.res.locals.jwtPayload = jwtPayload;
      req.res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
