import { urls } from "../constants";
import { IAuth, ITokens, IUser } from "../interfaces";
import { apiService, IRes } from "./apiServices";

const accessTokenKey = "access";
const refreshTokenKey = "refresh";

const authService = {
  register(user: IAuth): IRes<IUser> {
    return apiService.post(urls.auth.register, user);
  },
  async login(user: IAuth): Promise<IUser> {
    const { data } = await apiService.post<ITokens>(urls.auth.login, user);
    this.setTokens(data);
    const { data: me } = await this.me();
    return me;
  },

  async refresh(): Promise<void> {
    const refresh = this.getRefreshToken();
    const { data } = await apiService.post<ITokens>(urls.auth.refresh, {
      refresh,
    });
    this.setTokens(data);
  },

  me(): IRes<IUser> {
    return apiService.get(urls.auth.me);
  },

  async logout(): Promise<void> {
    await apiService.delete(urls.auth.logout);
    this.deleteTokens();
  },

  async logoutAll(): Promise<void> {
    await apiService.delete(urls.auth.logoutAll);
    this.deleteTokens();
  },

  async forgotPassword(email: string): Promise<void> {
    await apiService.post(urls.auth.forgotPassword, { email });
  },

  async setForgotPassword(token: string, newPassword: string): Promise<void> {
    await apiService.put(urls.auth.forgotPassword, { token, newPassword });
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

  setTokens({ refresh, access }: ITokens): void {
    localStorage.setItem(accessTokenKey, access);
    localStorage.setItem(refreshTokenKey, refresh);
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
