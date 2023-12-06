import { createContext } from 'react'

import { UserProfile } from '@/interfaces'

interface ContextPros {
    isMenuOpen: boolean
    isModalOpen: boolean
    isUserModalOpen: boolean
    userProfile: UserProfile | null
    isAnswerRight?: boolean
    rightText: string
    wrongText: string
    rightTitle: string
    wrongTitle: string

    //Methods
    toggleSideMenu: () => void
    toggleModal: () => void
    toggleUserModal: () => void
    rightAnswer: () => void
    wrongAnswer: () => void
    resetAnswer: () => void
    /* eslint-disable-next-line no-unused-vars */
    setUserProfile: (user: UserProfile) => void
    resetUserProfile: () => void
}

export const UIContext = createContext({} as ContextPros)