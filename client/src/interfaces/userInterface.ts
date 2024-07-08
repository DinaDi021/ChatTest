export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  emailVerified: boolean;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export interface IUserResponse {
  data: IUser;
}

export interface IUpdateProfileParams {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}
