import { admin } from "../configs/firebase";

export interface IUser extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar?: string;
  emailVerified: boolean;
  createdAt: admin.firestore.Timestamp;
}

export type IUserCredentials = Pick<IUser, "email" | "password">;
