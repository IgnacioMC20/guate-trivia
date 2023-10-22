/* eslint-disable no-unused-vars */
import { createContext } from 'react'

import { IUser } from '../../interfaces'

export interface RegisterUser {
    name: string
    email: string
    password: string
    avatar: number
}
interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: ({name, email, password, avatar}: RegisterUser) => Promise<{ hasError: boolean; message?: string; }>;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps )