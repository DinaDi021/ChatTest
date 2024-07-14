import { urls } from "../constants";
import {
  IUpdateProfileParams,
  IUserResponse,
  IUsersResponse,
} from "../interfaces";
import { apiService, IRes } from "./apiServices";

const usersService = {
  getUsers: (): IRes<IUsersResponse> => apiService.get(urls.users.all),
  postAvatar: (id: string, data: FormData): IRes<IUserResponse> =>
    apiService.post(urls.users.avatar(id), data),
  updateProfile: (
    id: string,
    params: IUpdateProfileParams,
  ): IRes<IUserResponse> => apiService.patch(urls.users.byId(id), params),
  deleteProfile: (id: string): IRes<void> =>
    apiService.delete(urls.users.byId(id)),
  deleteAvatar: (id: string): IRes<void> =>
    apiService.delete(urls.users.avatar(id)),
};

export { usersService };
