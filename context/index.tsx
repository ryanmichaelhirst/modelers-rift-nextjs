import {
  Action,
  AppState,
  ContextDispatch,
  SET_ANIMATIONS,
  SET_CURRENT_CHARACTER,
  SET_SELECTED_SKIN,
} from '@customtypes/index'
import { Character } from '@utils/trpc'
import { createContext, FC, PropsWithChildren, Reducer, useContext, useReducer } from 'react'

export const initialState: AppState = {}

const Store = createContext<[AppState, ContextDispatch]>([{} as AppState, () => {}])

export const useAppContext = () => useContext(Store)

export const StoreProvider: FC<PropsWithChildren<{ initialState: AppState; reducer: any }>> = ({
  children,
  initialState,
  reducer,
}) => {
  const [state, dispatch] = useReducer<Reducer<AppState, Action>>(reducer, initialState)

  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>
}

export const reducer: Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case SET_SELECTED_SKIN:
      // TODO: fix type collision
      const newCurrentCharacter = {
        ...state.currentCharacter,
        skin: action.payload,
      } as Character & { skin: string }

      return {
        ...state,
        currentCharacter: newCurrentCharacter,
      }
    case SET_CURRENT_CHARACTER:
      const value = {
        ...action.payload,
        skin: 'skin0',
      } as Character & { skin: string }

      return {
        ...state,
        currentCharacter: value,
      }
    case SET_ANIMATIONS:
      return {
        ...state,
        animations: action.payload?.sort(),
      }
    default:
      return state
  }
}
