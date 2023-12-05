import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { FC, useReducer, useEffect, useState } from 'react'

import { AuthContext, RegisterUser, authReducer } from './'
import { IUser } from '@/interfaces'
import { gtApi } from '@/utils'

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
    friendIds: string[];
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
    friendIds: []
}

export const AuthProvider: FC<any> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(AUTH_INITIAL_STATE.isLoggedIn)

    useEffect(() => {
        checkToken()
    }, [isLoggedIn])

    const checkToken = async () => {

        if (!Cookies.get('token')) {
            Cookies.remove('isLoggedIn')
            setIsLoggedIn(false)
            return
        }
        if (!Cookies.get('isLoggedIn')) {
            Cookies.remove('token')
            setIsLoggedIn(false)
            return
        }

        try {
            const { data } = await gtApi.get('/auth/validate-token')
            const { token, user } = data
            Cookies.set('token', token)
            Cookies.set('isLoggedIn', 'true')
            setIsLoggedIn(true)
            dispatch({ type: '[Auth] - Login', payload: user })
        } catch (error) {
            Cookies.remove('token')
        }
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {

        try {
            const { data } = await gtApi.post('/auth/login', { email, password })
            const { token, user } = data
            Cookies.set('token', token)
            Cookies.set('isLoggedIn', 'true')
            setIsLoggedIn(true)
            dispatch({ type: '[Auth] - Login', payload: user })
            return true
        } catch (error) {
            return false
        }
    }

    const registerUser = async ({ name, email, password, avatar }: RegisterUser): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await gtApi.post('/auth/signup', { name, email, password, avatar })
            const { token, user } = data
            Cookies.set('token', token)
            Cookies.set('isLoggedIn', 'true')
            setIsLoggedIn(true)
            dispatch({ type: '[Auth] - Login', payload: user })
            return {
                hasError: false
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const logout = () => {
        Cookies.remove('token')
        Cookies.remove('isLoggedIn')
        router.reload()
    }

    const setFriendIds = (friendIds: string[]) => {
        dispatch({ type: '[Friends] - Set Friend Ids', payload: friendIds })
    
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout,
            setFriendIds
        }}>
            {children}
        </AuthContext.Provider>
    )
}