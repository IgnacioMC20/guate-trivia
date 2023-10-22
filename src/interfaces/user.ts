export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  resetPasswordToken?: string,
  resetPasswordExpires?: string,

  createdAt?: string;
  updatedAt?: string;
}