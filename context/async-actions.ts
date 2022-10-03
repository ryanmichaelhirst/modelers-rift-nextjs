import { dataDragonService } from '@lib/ddragon'
import { Reducer } from 'react'
import { AsyncActionHandlers } from 'use-reducer-async'
import {
  Action,
  AppState,
  AsyncAction,
  FETCH_LOL_INFO,
  FETCH_LOL_ITEMS,
  FETCH_NEW_CHAMPION,
  SET_CHAMPIONS,
  SET_ITEMS,
  SET_PATCHES,
  SET_SELECTED_CHAMPION,
} from '../types'

export const asyncActionHandlers: AsyncActionHandlers<Reducer<AppState, Action>, AsyncAction> = {
  [FETCH_LOL_ITEMS]:
    ({ dispatch, getState }) =>
    async (action) => {
      // get items
      const items = await dataDragonService.getItems(action.payload)
      dispatch({ type: SET_ITEMS, payload: items })
    },
  [FETCH_NEW_CHAMPION]:
    ({ dispatch, getState }) =>
    async (action) => {
      const latestPatch = dataDragonService.getLatestPatch()
      const { lolChampionsData } = getState()
      const name = dataDragonService.getJsonName(action.payload)?.toLowerCase() || ''

      // get basic lol data from DDragon
      const basicInfo = lolChampionsData[name]

      // get detail lol data from DDragon
      const detailedInfo = await dataDragonService.getChampion(latestPatch, basicInfo?.name || '')
      const skin = name === 'akali' ? 'skin1' : 'skin0'

      dispatch({
        type: SET_SELECTED_CHAMPION,
        payload: {
          basicInfo,
          detailedInfo,
          skin,
        },
      })
    },
  [FETCH_LOL_INFO]:
    ({ dispatch }) =>
    async (action) => {
      // get patches
      const patches = await dataDragonService.getPatches()
      const latestPatch = patches[0]

      // get basic lol data from DDragon
      const ddragonChampions = await dataDragonService.getChampions(latestPatch)
      const defaultChamp = 'aatrox'
      const basicInfo = ddragonChampions[defaultChamp]

      // get detail lol data from DDragon
      const detailedInfo = await dataDragonService.getChampion(latestPatch, basicInfo?.name || '')

      dispatch({ type: SET_PATCHES, payload: patches })
      dispatch({ type: SET_CHAMPIONS, payload: ddragonChampions })
      dispatch({
        type: SET_SELECTED_CHAMPION,
        payload: {
          basicInfo,
          detailedInfo,
          skin: 'skin0',
        },
      })
    },
}
