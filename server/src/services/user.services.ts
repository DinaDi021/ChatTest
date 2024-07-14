import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/users.types";
import { EFileTypes, firebaseStorageService } from "./firebaseStorage.service";

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

  public async getAll(userId: string): Promise<IUser[]> {
    const users = await userRepository.getAll();

    return users.filter((user) => user.id !== userId);
  }

  public async uploadAvatar(
    manageUserId: string,
    avatar: UploadedFile,
    userId: string,
  ): Promise<IUser> {
    this.checkUpdatePermission(userId, manageUserId);

    let prevAvatarPath: string | null = null;

    const currentUser = await userRepository.getUserById(manageUserId);
    if (currentUser && currentUser.avatar) {
      prevAvatarPath = currentUser.avatar;
    }

    const filePath = await firebaseStorageService.uploadFile(
      avatar,
      EFileTypes.User,
      manageUserId,
    );

    if (prevAvatarPath) {
      await firebaseStorageService.deleteFile(prevAvatarPath);
    }

    const updatedUser = await userRepository.updateOneById(manageUserId, {
      avatar: filePath,
    });

    return updatedUser;
  }

  public async deleteAvatar(
    manageUserId: string,
    avatar: string,
    userId: string,
  ): Promise<void> {
    this.checkUpdatePermission(userId, manageUserId);
    await firebaseStorageService.deleteFile(avatar);
    await userRepository.deleteAvatarField(manageUserId);
  }

  private checkUpdatePermission(userId: string, manageUserId: string): void {
    if (userId === manageUserId) {
      return;
    }
    throw new ApiError("You do not have permission to manage this user", 403);
  }
}

export const userService = new UserService();
