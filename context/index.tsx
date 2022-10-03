import {
  Action,
  AppState,
  AsyncAction,
  ContextDispatch,
  SET_ANIMATIONS,
  SET_CURRENT_CHARACTER,
  SET_SELECTED_SKIN,
} from '@customtypes/index'
import { Character } from '@utils/trpc'
import { createContext, FC, PropsWithChildren, Reducer, useContext } from 'react'
import { useReducerAsync } from 'use-reducer-async'
import { SET_ITEMS } from '../types'
import { asyncActionHandlers } from './async-actions'

export const initialState: AppState = {
  lolItemsData: {},
}

const Store = createContext<[AppState, ContextDispatch]>([{} as AppState, () => {}])

export const useAppContext = () => useContext(Store)

export const StoreProvider: FC<PropsWithChildren<{ initialState: AppState; reducer: any }>> = ({
  children,
  initialState,
  reducer,
}) => {
  const [state, dispatch] = useReducerAsync<
    Reducer<AppState, Action>,
    AsyncAction,
    AsyncAction | Action
  >(reducer, initialState, asyncActionHandlers)

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
    case SET_ITEMS:
      return {
        ...state,
        lolItemsData: action.payload,
      }
    default:
      return state
  }
}
