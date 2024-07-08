import { EActionTokenType } from "../enums/actionTokenType";

export interface ITokenPayload {
  userId: string;
}

export interface ITokensPair {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends Document {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface IActionTokenDocument extends Document {
  token: string;
  type: EActionTokenType;
  userId: string;
}

export interface IActionToken
  extends Pick<IActionTokenDocument, "token" | "type" | "userId"> {}
