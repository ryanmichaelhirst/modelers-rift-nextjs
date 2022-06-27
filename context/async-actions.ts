import { getChampion, getChampions, getItems, getJsonName, getPatches } from '@utils/index'
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
  [FETCH_LOL_ITEMS]: ({ dispatch, getState }) => async (action) => {
    // get items
    const items = await getItems(action.payload)
    dispatch({ type: SET_ITEMS, payload: items })
  },
  [FETCH_NEW_CHAMPION]: ({ dispatch, getState }) => async (action) => {
    const { selectedPatch, lolChampionsData } = getState()
    const name = getJsonName(action.payload)?.toLowerCase() || ''

    // get basic lol data from DDragon
    const basicInfo = lolChampionsData[name]

    // get detail lol data from DDragon
    const detailedInfo = await getChampion(selectedPatch, basicInfo?.name || '')

    dispatch({
      type: SET_SELECTED_CHAMPION,
      payload: {
        basicInfo,
        detailedInfo,
        skin: 'skin0',
      },
    })
  },
  [FETCH_LOL_INFO]: ({ dispatch }) => async (action) => {
    // get patches
    const patches = await getPatches()
    const latestPatch = patches[0]

    // get basic lol data from DDragon
    const ddragonChampions = await getChampions(latestPatch)
    const defaultChamp = 'aatrox'
    const basicInfo = ddragonChampions[defaultChamp]

    // get detail lol data from DDragon
    const detailedInfo = await getChampion(latestPatch, basicInfo?.name || '')

    dispatch({ type: SET_PATCHES, payload: patches })
    dispatch({ type: SET_CHAMPIONS, payload: ddragonChampions })
    dispatch({
      type: SET_SELECTED_CHAMPION,
      payload: {
        basicInfo,
        detailedInfo,
      },
    })
  },
}
