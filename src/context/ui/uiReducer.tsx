import { UIState } from './UIProvider'

type UIActionType =
    | { type: '[UI] - ToggleMenu' }
    | { type: '[UI] - ToggleModal' }
    | { type: '[UI] - RightAnswer' }
    | { type: '[UI] - WrongAnswer' }
    | { type: '[UI] - ResetAnswer' }

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
        default:
            return state
    }
}