import { AuthState } from './'
import { IUser } from '../../interfaces'

type AuthActionType =
    | { type: '[Auth] - Login', payload: IUser }
    | { type: '[Auth] - Logout' }
    | { type: '[Friends] - Set Friend Ids', payload: string[] }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
            }

        case '[Friends] - Set Friend Ids':
            return {
                ...state,
                friendIds: [...state.friendIds, ...action.payload]
            }

        default:
            return state
    }

}
