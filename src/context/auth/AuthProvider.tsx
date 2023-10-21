import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { FC, useReducer, useEffect } from 'react'

import { AuthContext, authReducer } from './'
import { IUser } from '../../interfaces'
import { gtApi } from '@/utils'

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider:FC<any> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE )
    const router = useRouter()

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async() => {

        if ( !Cookies.get('token') ) {
            return
        }

        try {
            const { data } = await gtApi.get('/auth/validate-token')
            const { token, user } = data
            Cookies.set('token', token )
            dispatch({ type: '[Auth] - Login', payload: user })
        } catch (error) {
            Cookies.remove('token')
        }
    }

    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await gtApi.post('/auth/login', { email, password })
            const { token, user } = data
            Cookies.set('token', token )
            dispatch({ type: '[Auth] - Login', payload: user })
            return true
        } catch (error) {
            return false
        }

    }

    const registerUser = async( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await gtApi.post('/auth/signup', { name, email, password })
            const { token, user } = data
            Cookies.set('token', token )
            dispatch({ type: '[Auth] - Login', payload: user })
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
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
        Cookies.remove('cart')
        router.reload()
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}