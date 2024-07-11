import { urls } from "../constants";
import {
  IUpdateProfileParams,
  IUserResponse,
  IUsersResponse,
} from "../interfaces";
import { apiService, IRes } from "./apiServices";

const usersService = {
  getUsers: (): IRes<IUsersResponse> => apiService.get(urls.users.all),
  updateProfile: (
    id: string,
    params: IUpdateProfileParams,
  ): IRes<IUserResponse> => apiService.patch(urls.users.byId(id), params),
  deleteProfile: (id: string): IRes<void> =>
    apiService.delete(urls.users.byId(id)),
};

export { usersService };
