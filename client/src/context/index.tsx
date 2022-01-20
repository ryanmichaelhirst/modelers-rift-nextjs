import { ChampionBasicInfo, ChampionDetailedInfo } from '@customtypes/index'
import { createContext, FC, useContext, useReducer } from 'react'

export const SET_SELECTED_PATCH = 'SET_SELECTED_PATCH'
export const SET_SELECTED_CHAMPION_BASIC_INFO = 'SET_SELECTED_CHAMPION_BASIC_INFO'
export const SET_SELECTED_CHAMPION_DETAILED_INFO = 'SET_SELECTED_CHAMPION_DETAILED_INFO'
export const SET_SELECTED_CHAMPION_SKIN = 'SET_SELECTED_CHAMPION_SKIN'
export const SET_LOL_CHAMPIONS_DATA = 'SET_LOL_CHAMPIONS_DATA'

interface AppState {
  selectedChampion: {
    basicInfo?: ChampionBasicInfo
    detailedInfo?: ChampionDetailedInfo
    skin?: string
  }
  selectedPatch: string
  lolChampionsData: Record<string, any>
}

type Action = {
  type:
    | typeof SET_SELECTED_CHAMPION_BASIC_INFO
    | typeof SET_SELECTED_CHAMPION_DETAILED_INFO
    | typeof SET_SELECTED_CHAMPION_SKIN
    | typeof SET_SELECTED_PATCH
    | typeof SET_LOL_CHAMPIONS_DATA
  payload: Record<string, any> | string
}

// store hook & provider
const Store = createContext<[AppState, any]>([{} as AppState, () => {}])

export const useAppContext = () => useContext(Store)

export const StoreProvider: FC<{ initialState: AppState; reducer: any }> = ({
  children,
  initialState,
  reducer,
}) => {
  const [store, dispatch] = useReducer(reducer, initialState)

  return <Store.Provider value={[store as AppState, dispatch]}>{children}</Store.Provider>
}

// default state & reducer
export const initialState: AppState = {
  selectedChampion: {},
  selectedPatch: '12.2.1',
  lolChampionsData: {},
}

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case SET_SELECTED_CHAMPION_BASIC_INFO:
      return {
        ...state,
        selectedChampion: {
          ...state.selectedChampion,
          basicInfo: action.payload,
        },
      }
    case SET_SELECTED_CHAMPION_DETAILED_INFO:
      return {
        ...state,
        selectedChampion: {
          ...state.selectedChampion,
          detailedInfo: action.payload,
        },
      }
    case SET_SELECTED_CHAMPION_SKIN:
      return {
        ...state,
        selectedChampion: {
          ...state.selectedChampion,
          skin: action.payload,
        },
      }
    case SET_SELECTED_PATCH:
      return {
        ...state,
        selectedPatch: action.payload,
      }
    case SET_LOL_CHAMPIONS_DATA:
      return {
        ...state,
        lolChampionsData: action.payload,
      }
    default:
      return state
  }
}
