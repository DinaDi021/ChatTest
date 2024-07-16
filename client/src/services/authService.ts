import { urls } from "../constants";
import {
  IAuth,
  ITokens,
  ITokensResponce,
  IUser,
  IUserResponse,
} from "../interfaces";
import { apiService, IRes } from "./apiServices";

const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";

const authService = {
  register(user: IAuth): IRes<IUser> {
    return apiService.post(urls.auth.register, user);
  },
  async login(user: IAuth): Promise<IUserResponse> {
    const response = await apiService.post<ITokensResponce>(
      urls.auth.login,
      user,
    );
    const tokens = response.data.data;
    this.setTokens(tokens);
    const userResponse = await this.me();
    return userResponse;
  },

  async refresh(): Promise<void> {
    const refresh = this.getRefreshToken();
    const response = await apiService.post<{ data: ITokens }>(
      urls.auth.refresh,
      {
        refresh,
      },
    );
    const tokens = response.data.data;
    this.setTokens(tokens);
  },

  async me(): Promise<IUserResponse> {
    const response = await apiService.get(urls.auth.me);
    return response.data;
  },

  async logout(): Promise<void> {
    await apiService.post(urls.auth.logout);
    this.deleteTokens();
  },

  async logoutAll(): Promise<void> {
    await apiService.post(urls.auth.logoutAll);
    this.deleteTokens();
  },

  async forgotPassword(email: string): Promise<void> {
    await apiService.post(urls.auth.forgotPassword, { email });
  },

  async setForgotPassword(
    actionToken: string,
    newPassword: string,
  ): Promise<void> {
    await apiService.put(urls.auth.setForgotPassword(actionToken), {
      newPassword,
    });
  },

  async changePassword(
    token: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    await apiService.post(urls.auth.changePassword, {
      token,
      oldPassword,
      newPassword,
    });
  },

  async getActivateEmail(): Promise<void> {
    await apiService.post(urls.auth.sendActivate);
  },

  async activateEmail(actionToken: string): Promise<void> {
    await apiService.put(urls.auth.activateAccount(actionToken));
  },

  setTokens({ refreshToken, accessToken }: ITokens): void {
    localStorage.setItem(accessTokenKey, accessToken);
    localStorage.setItem(refreshTokenKey, refreshToken);
  },

  getAccessToken(): string {
    return localStorage.getItem(accessTokenKey);
  },
  getRefreshToken(): string {
    return localStorage.getItem(refreshTokenKey);
  },
  deleteTokens(): void {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
  },
};

export { authService };
