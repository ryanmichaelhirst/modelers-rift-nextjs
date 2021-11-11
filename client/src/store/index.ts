import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import championReducer from './slices/championSlice'
import itemReducer from './slices/itemSlice'

export const store = configureStore({
  reducer: {
    champion: championReducer,
    item: itemReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
