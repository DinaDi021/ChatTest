import { admin } from "../configs/firebase";
import { EActionTokenType } from "../enums/actionTokenType";
import { EEmailAction } from "../enums/email.action.enum";
import { ApiError } from "../errors/api.error";
import { actionTokenRepository } from "../repositories/actionToken.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { ITokenPayload, ITokensPair } from "../types/token.types";
import { IUser, IUserCredentials } from "../types/users.types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(dto: IUser): Promise<IUser> {
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
      await actionTokenRepository.create({
        token: actionToken,
        type: EActionTokenType.activate,
        userId: user.id,
      });
      await emailService.sendMail(dto.email, EEmailAction.REGISTER, {
        name: dto.firstName,
        actionToken,
      });

      return user;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(dto: IUserCredentials): Promise<ITokensPair> {
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
      await tokenRepository.create({ ...tokensPair, userId: user.id });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getMe(userId: string): Promise<IUser> {
    return await userRepository.getUserById(userId);
  }

  public async refresh(
    payload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokensPair> {
    try {
      const tokensPair = tokenService.generateTokenPair({
        userId: payload.userId,
      });
      await Promise.all([
        tokenRepository.create({
          ...tokensPair,
          userId: payload.userId,
        }),
        tokenRepository.deleteOne({ token: refreshToken }),
      ]);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async logout(accessToken: string): Promise<void> {
    try {
      await tokenRepository.deleteOne({ token: accessToken });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async logoutAll(userId: string): Promise<void> {
    try {
      await tokenRepository.deleteManyByUserId(userId);
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
      const entity = await actionTokenRepository.findOne({ token });
      if (!entity) {
        throw new ApiError("Not valid token", 400);
      }
      await Promise.all([
        actionTokenRepository.deleteManyByUserIdAndType(
          payload.userId,
          EActionTokenType.activate,
        ),
        userRepository.setStatusForUser(payload.userId, true),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async sendActivationToken(tokenPayload: ITokenPayload): Promise<void> {
    try {
      const user = await userRepository.getUserById(tokenPayload.userId);
      if (user.emailVerified) {
        throw new ApiError("User can not be activated", 403);
      }

      const actionToken = tokenService.generateActionToken(
        {
          userId: user.id,
        },
        EActionTokenType.activate,
      );
      await actionTokenRepository.create({
        token: actionToken,
        type: EActionTokenType.activate,
        userId: user.id,
      });
      await emailService.sendMail(user.email, EEmailAction.REGISTER, {
        name: user.firstName,
        actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        {
          userId: user.id,
        },
        EActionTokenType.forgotPassword,
      );

      await Promise.all([
        actionTokenRepository.create({
          token: actionToken,
          type: EActionTokenType.forgotPassword,
          userId: user.id,
        }),
        emailService.sendMail(user.email, EEmailAction.FORGOT_PASSWORD, {
          actionToken,
        }),
      ]);
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
      const entity = await actionTokenRepository.findOne({
        token: actionToken,
      });
      if (!entity) {
        throw new ApiError("Not valid token", 400);
      }

      const newHashedPassword = await passwordService.hash(newPassword);

      await Promise.all([
        userRepository.updateOneById(payload.userId, {
          password: newHashedPassword,
        }),
        actionTokenRepository.deleteOne({ token: actionToken }),
      ]);
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
