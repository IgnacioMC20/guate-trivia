import { createContext } from 'react'

interface ContextPros {
    isMenuOpen: boolean
    isModalOpen: boolean
    isAnswerRight?: boolean
    rightText: string
    wrongText: string
    rightTitle: string
    wrongTitle: string

    //Methods
    toggleSideMenu: () => void
    toggleModal: () => void
    rightAnswer: () => void
    wrongAnswer: () => void
    resetAnswer: () => void
}

export const UIContext = createContext({} as ContextPros)