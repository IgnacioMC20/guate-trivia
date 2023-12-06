import { FC, useReducer } from 'react'

import { UIContext, uiReducer } from './'
import { UserProfile } from '@/interfaces'

export interface UIState {
    isMenuOpen: boolean
    isUserModalOpen: boolean
    isModalOpen: boolean
    isAnswerRight?: boolean
    rightText: string
    wrongText: string
    rightTitle: string
    wrongTitle: string
    userProfile: UserProfile | null

}

const UI_INITIAL_STATE: UIState = {
    rightText: ' correcta',
    wrongText: ' incorrecta',
    rightTitle: '¡Felicidades! 🥳',
    wrongTitle: '¡Inténtalo de nuevo! 😢',
    isMenuOpen: false,
    isModalOpen: false,
    isUserModalOpen: false,
    userProfile: null
}

export const UIProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const toggleSideMenu = () => dispatch({ type: '[UI] - ToggleMenu' })
    const toggleModal = () => dispatch({ type: '[UI] - ToggleModal' })
    const toggleUserModal = () => dispatch({ type: '[UI] - ToggleUserModal' })
    const rightAnswer = () => dispatch({ type: '[UI] - RightAnswer' })
    const wrongAnswer = () => dispatch({ type: '[UI] - WrongAnswer' })
    const resetAnswer = () => dispatch({ type: '[UI] - ResetAnswer' })
    const setUserProfile = (user: UserProfile) => dispatch({ type: '[UI] - SetUserProfile', payload: user  })
    const resetUserProfile = () => dispatch({ type: '[UI] - ResetUserProfile' })

    return (
        <UIContext.Provider value={{
            ...state,

            //Methods
            toggleSideMenu,
            toggleModal,
            toggleUserModal,
            rightAnswer,
            wrongAnswer,
            resetAnswer,
            setUserProfile,
            resetUserProfile

        }}>
            {children}
        </UIContext.Provider>
    )
}