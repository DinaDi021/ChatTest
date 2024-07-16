import { admin } from "../configs/firebase";
import { EActionTokenType } from "../enums/actionTokenType";
import { EEmailAction } from "../enums/email.action.enum";
import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { ITokenPayload, ITokensPair } from "../types/token.types";
import { IUser, IUserCredentials } from "../types/users.types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.services";

class AuthService {
  public async register(dto: IUser, res: any): Promise<IUser> {
    try {
      const hashedPassword = await passwordService.hash(dto.password);

      const user = await userRepository.register({
        ...dto,
        password: hashedPassword,
        emailVerified: false,
        createdAt:
          admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
      });

      const actionToken = tokenService.generateActionToken(
        {
          userId: user.id,
        },
        EActionTokenType.activate,
      );

      tokenService.setActionTokenCookie(res, actionToken);

      await emailService.sendMail(dto.email, EEmailAction.REGISTER, {
        name: dto.firstName,
        actionToken,
      });

      return user;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(dto: IUserCredentials, res: any): Promise<ITokensPair> {
    try {
      const user = await userRepository.getOneByEmail({ email: dto.email });
      if (!user) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const isMatched = await passwordService.compare(
        dto.password,
        user.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const tokensPair = tokenService.generateTokenPair({
        userId: user.id,
      });
      tokenService.setTokenCookies(res, tokensPair);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getMe(userId: string): Promise<IUser> {
    return await userRepository.getUserById(userId);
  }

  public async refresh(payload: ITokenPayload, res: any): Promise<ITokensPair> {
    try {
      res.cookie("refreshToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(1),
      });

      const tokensPair = tokenService.generateTokenPair({
        userId: payload.userId,
      });

      tokenService.setTokenCookies(res, tokensPair);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async logout(res: any): Promise<void> {
    try {
      res.cookie("accessToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(1),
      });

      res.cookie("refreshToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(1),
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activate(token: string): Promise<void> {
    try {
      const payload = tokenService.checkActionToken(
        token,
        EActionTokenType.activate,
      );
      await userRepository.setStatusForUser(payload.userId, true);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(user: IUser, res: any): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        {
          userId: user.id,
        },
        EActionTokenType.forgotPassword,
      );

      tokenService.setActionTokenCookie(res, actionToken);
      await emailService.sendMail(user.email, EEmailAction.FORGOT_PASSWORD, {
        actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotPassword(
    actionToken: string,
    newPassword: string,
  ): Promise<void> {
    try {
      const payload = tokenService.checkActionToken(
        actionToken,
        EActionTokenType.forgotPassword,
      );

      const newHashedPassword = await passwordService.hash(newPassword);

      await userRepository.updateOneById(payload.userId, {
        password: newHashedPassword,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    data: { newPassword: string; oldPassword: string },
    userId: string,
  ) {
    try {
      const user = await userRepository.getUserById(userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      const isMatched = await passwordService.compare(
        data.oldPassword,
        user.password,
      );

      if (!isMatched) {
        throw new ApiError("invalid password", 400);
      }

      const hashedNewPassword = await passwordService.hash(data.newPassword);
      await userRepository.updateOneById(userId, {
        password: hashedNewPassword,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
