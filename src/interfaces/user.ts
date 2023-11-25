export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  level: number;
  avatar: string;
  resetPasswordToken?: string,
  resetPasswordExpires?: string,

  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  id?: number;
  name: string;
  email: string;
  level: number;
  avatar: string;
  // ... otros campos de perfil
}