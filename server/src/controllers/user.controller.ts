import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

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

      const presentedUser = await UserPresenter.present(user);

      res.status(200).json({ data: presentedUser });
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

      const presentedUser = await UserPresenter.present(user);

      return res.json({ data: presentedUser });
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
      const { userId: userId } = req.res.locals.jwtPayload;
      const users = await userService.getAll(userId);

      const presentedUsers = await Promise.all(
        users.map(async (user) => {
          return await UserPresenter.present(user);
        }),
      );

      return res.json({ data: presentedUsers });
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { userId } = req.res.locals.jwtPayload;
      const avatar = req.files.avatar as UploadedFile;

      const updatedUser = await userService.uploadAvatar(
        req.params.userId,
        avatar,
        userId,
      );
      const presentedUser = await UserPresenter.present(updatedUser);

      return res.json({ data: presentedUser });
    } catch (error) {
      next(error);
    }
  }

  public async deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.jwtPayload;
      const { avatar } = res.locals;

      await userService.deleteAvatar(req.params.userId, avatar, userId);

      res.status(200).json({ message: "Avatar deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
