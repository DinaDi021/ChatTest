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

  public async register(dto: IUser): Promise<IUser> {
    const docRef = await db.collection("users").add(dto);
    dto.id = docRef.id;
    await docRef.update({ id: docRef.id });
    return dto;
  }

  public async getOneByEmail(params: { email: string }): Promise<IUser> {
    const { email } = params;
    const querySnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (querySnapshot.empty) {
      return null;
    }
    return querySnapshot.docs[0].data() as IUser;
  }

  public async setStatusForUser(
    userId: string,
    status: boolean,
  ): Promise<void> {
    const userRef = db.collection("users").doc(userId);
    await userRef.update({
      status: status,
    });
  }
}

export const userRepository = new UserRepository();