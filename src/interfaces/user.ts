export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  level: number;
  trophys: number;
  avatar: string;
  resetPasswordToken?: string,
  resetPasswordExpires?: string,

  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  level: number;
  avatar: string;
  trophys?: number;
  // ... otros campos de perfil
}