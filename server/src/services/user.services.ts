import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/users.types";

class UserService {
  public async updateUser(
    manageUserId: string,
    dto: Partial<IUser>,
    userId: string,
  ): Promise<IUser> {
    this.checkUpdatePermission(userId, manageUserId);
    return await userRepository.updateOneById(manageUserId, dto);
  }

  public async deleteUser(manageUserId: string, userId: string): Promise<void> {
    this.checkUpdatePermission(userId, manageUserId);
    await userRepository.deleteUser(manageUserId);
  }

  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  private checkUpdatePermission(userId: string, manageUserId: string): void {
    if (userId === manageUserId) {
      return;
    }
    throw new ApiError("You do not have permission to manage this user", 403);
  }
}

export const userService = new UserService();
