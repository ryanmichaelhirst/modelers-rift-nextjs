import { Action, AppState, ContextDispatch, SET_ANIMATIONS } from '@customtypes/index'
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
    case SET_ANIMATIONS:
      return {
        ...state,
        animations: action.payload?.sort(),
      }
    default:
      return state
  }
}
