import { NextFunction, Request, Response } from "express";

import { UserPresenter } from "../presenters/user.presenter";
import { authService } from "../services/auth.service";
import { ITokenPayload, ITokensPair } from "../types/token.types";
import { IUser } from "../types/users.types";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const createdUser = await authService.register(req.body, res);

      return res.json({ data: UserPresenter.present(createdUser) });
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensPair>> {
    try {
      const tokensPair = await authService.login(req.body, res);

      return res.json({ data: tokensPair });
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.jwtPayload as ITokenPayload;
      const user = await authService.getMe(userId);

      res.json({ data: UserPresenter.present(user) });
    } catch (e) {
      next(e);
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensPair>> {
    try {
      const tokenPayload = req.res.locals.jwtPayload as ITokenPayload;
      const tokensPair = await authService.refresh(tokenPayload, res);

      return res.status(201).json({ data: tokensPair });
    } catch (e) {
      next(e);
    }
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await authService.logout(res);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async activate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const actionToken = req.cookies.actionToken;

      await authService.activate(actionToken);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;
      await authService.forgotPassword(user as IUser, res);

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  public async setForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await authService.setForgotPassword(
        req.cookies.actionToken,
        req.body.newPassword,
        res,
      );

      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId: userId } = req.res.locals.jwtPayload;
      await authService.changePassword(req.body, userId);

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
