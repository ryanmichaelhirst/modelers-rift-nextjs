import { dataDragonService } from '@lib/ddragon'
import { Reducer } from 'react'
import { AsyncActionHandlers } from 'use-reducer-async'
import {
  Action,
  AppState,
  AsyncAction,
  FETCH_LOL_INFO,
  FETCH_LOL_ITEMS,
  SET_CHAMPIONS,
  SET_ITEMS,
} from '../types'

export const asyncActionHandlers: AsyncActionHandlers<Reducer<AppState, Action>, AsyncAction> = {
  [FETCH_LOL_ITEMS]:
    ({ dispatch, getState }) =>
    async (action) => {
      // get items
      const items = await dataDragonService.getItems(action.payload)
      dispatch({ type: SET_ITEMS, payload: items })
    },
  [FETCH_LOL_INFO]:
    ({ dispatch }) =>
    async (action) => {
      const latestPatch = await dataDragonService.getLatestPatch()

      // get basic lol data from DDragon
      const ddragonChampions = await dataDragonService.getChampions(latestPatch)
      const defaultChamp = 'aatrox'
      const basicInfo = ddragonChampions[defaultChamp]

      // get detail lol data from DDragon
      const detailedInfo = await dataDragonService.getChampion(latestPatch, basicInfo?.name || '')

      dispatch({ type: SET_CHAMPIONS, payload: ddragonChampions })
    },
}
