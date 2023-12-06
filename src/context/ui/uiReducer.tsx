import { UIState } from './UIProvider'
import { UserProfile } from '@/interfaces'

type UIActionType =
    | { type: '[UI] - ToggleMenu' }
    | { type: '[UI] - ToggleModal' }
    | { type: '[UI] - ToggleUserModal' }
    | { type: '[UI] - RightAnswer' }
    | { type: '[UI] - WrongAnswer' }
    | { type: '[UI] - ResetAnswer' }
    | { type: '[UI] - ResetUserProfile' }
    | { type: '[UI] - SetUserProfile', payload: UserProfile }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case '[UI] - ToggleMenu':

            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }

        case '[UI] - ToggleModal':

            return {
                ...state,
                isModalOpen: !state.isModalOpen
            }
        case '[UI] - ToggleUserModal':

            return {
                ...state,
                isUserModalOpen: !state.isUserModalOpen
            }

        case '[UI] - RightAnswer':

            return {
                ...state,
                isAnswerRight: true
            }

        case '[UI] - WrongAnswer':

            return {
                ...state,
                isAnswerRight: false
            }

        case '[UI] - ResetAnswer':

            return {
                ...state,
                isAnswerRight: undefined
            }

        case '[UI] - ResetUserProfile':

            return {
                ...state,
                userProfile: null
            }

        case '[UI] - SetUserProfile':

            return {
                ...state,
                userProfile: action.payload
            }
        default:
            return state
    }
}