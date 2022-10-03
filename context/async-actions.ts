import { dataDragonService } from '@lib/ddragon'
import { Reducer } from 'react'
import { AsyncActionHandlers } from 'use-reducer-async'
import { Action, AppState, AsyncAction, FETCH_LOL_ITEMS, SET_ITEMS } from '../types'

export const asyncActionHandlers: AsyncActionHandlers<Reducer<AppState, Action>, AsyncAction> = {
  [FETCH_LOL_ITEMS]:
    ({ dispatch, getState }) =>
    async (action) => {
      // get items
      const items = await dataDragonService.getItems(action.payload)
      dispatch({ type: SET_ITEMS, payload: items })
    },
}
