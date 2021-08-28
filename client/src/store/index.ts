import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import championReducer from './slices/championSlice'
import 'tippy.js/dist/tippy.css'

export const store = configureStore({
  reducer: {
    champion: championReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
