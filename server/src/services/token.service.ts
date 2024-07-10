import * as jwt from "jsonwebtoken";

import { configs } from "../configs/configs";
import { EActionTokenType } from "../enums/actionTokenType";
import { ApiError } from "../errors/api.error";
import { ITokenPayload, ITokensPair } from "../types/token.types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokensPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "4h",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "20h",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public setTokenCookies(res: any, tokens: ITokensPair) {
    const { accessToken, refreshToken } = tokens;

    res.cookie("accessToken", accessToken, {
      maxAge: 4 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 20 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
  }

  public setActionTokenCookie(res: any, actionToken: string): void {
    res.cookie("actionToken", actionToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
  }

  public checkToken(token: string, type: "access" | "refresh"): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case "access":
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case "refresh":
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }

  public generateActionToken(
    payload: ITokenPayload,
    tokenType: EActionTokenType,
  ): string {
    let secret: string;

    switch (tokenType) {
      case EActionTokenType.forgotPassword:
        secret = configs.JWT_FORGOT_SECRET;
        break;
      case EActionTokenType.activate:
        secret = configs.JWT_ACTIVATE_SECRET;
        break;
    }

    return jwt.sign(payload, secret, {
      expiresIn: "1d",
    });
  }

  public checkActionToken(
    token: string,
    tokenType: EActionTokenType,
  ): ITokenPayload {
    try {
      let secret: string;

      switch (tokenType) {
        case EActionTokenType.forgotPassword:
          secret = configs.JWT_FORGOT_SECRET;
          break;
        case EActionTokenType.activate:
          secret = configs.JWT_ACTIVATE_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }
}

export const tokenService = new TokenService();
