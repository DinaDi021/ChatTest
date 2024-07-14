import { IUser } from "../types/users.types";

export class UserPresenter {
  public static async present(data: IUser) {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      emailVerified: data.emailVerified,
      createdAt: data.createdAt,
      avatar: data.avatar,
    };
  }
}
