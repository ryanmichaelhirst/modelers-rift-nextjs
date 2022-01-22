import {
  Action,
  AppState,
  AsyncAction,
  SET_SELECTED_CHAMPION,
  SET_SELECTED_SKIN,
} from '@customtypes/index'
import { createContext, FC, Reducer, useContext } from 'react'
import { useReducerAsync } from 'use-reducer-async'
import { SET_CHAMPIONS, SET_ITEMS, SET_PATCHES, SET_SELECTED_PATCH } from '../types'
import { asyncActionHandlers } from './async-actions'

export const initialState: AppState = {
  selectedChampion: {},
  patches: [],
  selectedPatch: '12.2.1',
  lolChampionsData: {},
  lolItemsData: {},
}

const Store = createContext<[AppState, any]>([{} as AppState, () => {}])

export const useAppContext = () => useContext(Store)

export const StoreProvider: FC<{ initialState: AppState; reducer: any }> = ({
  children,
  initialState,
  reducer,
}) => {
  const [state, dispatch] = useReducerAsync<Reducer<AppState, Action>, AsyncAction, AsyncAction>(
    reducer,
    initialState,
    asyncActionHandlers,
  )

  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>
}

export const reducer: Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case SET_SELECTED_PATCH:
      return {
        ...state,
        selectedPatch: action.payload,
      }
    case SET_SELECTED_CHAMPION:
      return {
        ...state,
        selectedChampion: action.payload,
      }
    case SET_SELECTED_SKIN:
      return {
        ...state,
        selectedChampion: {
          ...state.selectedChampion,
          skin: action.payload,
        },
      }
    case SET_PATCHES:
      return {
        ...state,
        patches: action.payload,
      }
    case SET_CHAMPIONS:
      return {
        ...state,
        lolChampionsData: action.payload,
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
