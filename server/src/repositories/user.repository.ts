import { db } from "../configs/firebase";
import { IUser } from "../types/users.types";

class UserRepository {
  public async getUserById(userId: string): Promise<IUser> {
    const userDoc = await db.collection("users").doc(userId).get();
    return userDoc.data() as IUser;
  }

  public async updateOneById(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    const userRef = db.collection("users").doc(userId);
    await userRef.update(dto);
    const updatedUserSnapshot = await userRef.get();
    return updatedUserSnapshot.data() as IUser;
  }

  public async deleteUser(userId: string): Promise<void> {
    await db.collection("users").doc(userId).delete();
  }
}

export const userRepository = new UserRepository();
