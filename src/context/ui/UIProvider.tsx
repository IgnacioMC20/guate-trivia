import { FC, useReducer } from 'react'

import { UIContext, uiReducer } from './'

export interface UIState{
    isMenuOpen: boolean
    isModalOpen: boolean
    isAnswerRight?: boolean
    rightText: string
    wrongText: string
    rightTitle: string
    wrongTitle: string
}

const UI_INITIAL_STATE: UIState = {
    rightText: ' correcta',
    wrongText: ' incorrecta',
    rightTitle: '¡Felicidades! 🥳',
    wrongTitle: '¡Inténtalo de nuevo! 😢',
    isMenuOpen: false,
    isModalOpen: false,
}

export const UIProvider: FC<{children: React.ReactNode}> = ({children}) => {
  
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const toggleSideMenu = () => dispatch({type: '[UI] - ToggleMenu'})
    const toggleModal = () => dispatch({type: '[UI] - ToggleModal'})
    const rightAnswer = () => dispatch({type: '[UI] - RightAnswer'})
    const wrongAnswer = () => dispatch({type: '[UI] - WrongAnswer'})
    const resetAnswer = () => dispatch({type: '[UI] - ResetAnswer'})

    return (
        <UIContext.Provider value={{
            ...state,

            //Methods
            toggleSideMenu,
            toggleModal,
            rightAnswer,
            wrongAnswer,
            resetAnswer,

        }}>
            { children }
        </UIContext.Provider>
    )
}