import { NextFunction, Request, Response } from "express";

import { UserPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.services";
import { ITokenPayload } from "../types/token.types";
import { IUser } from "../types/users.types";

class UserController {
  public async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.jwtPayload as ITokenPayload;

      const user = await userService.updateUser(
        req.params.userId,
        req.body,
        userId,
      );

      res.status(200).json({ data: UserPresenter.present(user) });
    } catch (e) {
      next(e);
    }
  }

  public async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.jwtPayload as ITokenPayload;

      await userService.deleteUser(req.params.userId, userId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.res.locals as IUser;

      return res.json({ data: UserPresenter.present(user) });
    } catch (e) {
      next(e);
    }
  }

  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();

      const presentedUsers = users.map((user) => UserPresenter.present(user));

      return res.json({ data: presentedUsers });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
