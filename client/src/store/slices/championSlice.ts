import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../index'
import { SelectOption } from '../../types'

interface ChampionState {
  loading: boolean
  selectedStat: string
  champions: Record<string, Record<string, any>>
  playerChampion?: Record<string, any>
  opponentChampion?: Record<string, any>
  patches: string[]
  selectedPatch?: string
  loreLink?: string
}

const initialState: ChampionState = {
  loading: true,
  selectedStat: 'attackdamage',
  champions: {},
  patches: [],
  loreLink: 'https://universe.leagueoflegends.com/en_US/champion/brand/',
}

export const championSlice = createSlice({
  name: 'champion',
  initialState,
  reducers: {
    setChampions: (state, action: PayloadAction<Record<string, Record<string, any>>>) => {
      state.champions = action.payload
    },
    setPlayerChampion: (state, action: PayloadAction<Record<string, any>>) => {
      state.playerChampion = action.payload
    },
    setOpponentChampion: (state, action: PayloadAction<Record<string, any>>) => {
      state.opponentChampion = action.payload
    },
    setChampionLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setSelectedStat: (state, action: PayloadAction<SelectOption>) => {
      state.selectedStat = action.payload.value
    },
    setPatches: (state, action: PayloadAction<string[]>) => {
      state.patches = action.payload
    },
    setSelectedPatch: (state, action: PayloadAction<SelectOption>) => {
      state.selectedPatch = action.payload.value
    },
    setLoreLink: (state, action: PayloadAction<{ region: string; champion: string }>) => {
      const { region, champion } = action.payload
      state.loreLink = `https://universe.leagueoflegends.com/${region}/champion/${champion}/`
    },
  },
})

export const {
  setChampions,
  setPlayerChampion,
  setOpponentChampion,
  setChampionLoading,
  setSelectedStat,
  setSelectedPatch,
  setPatches,
  setLoreLink,
} = championSlice.actions

export const chooseChampion = (type: string, payload: { value: string }): AppThunk => async (
  dispatch,
  getState,
) => {
  const json = JSON.parse(payload.value)
  const state = getState()
  const { selectedPatch } = state.champion

  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${selectedPatch}/data/en_US/champion/${json.name}.json`,
  ).then((res) => res.json())
  const { name } = json

  if (type === 'playerChampion') dispatch(setPlayerChampion(data[name]))
  if (type === 'opponentChampion') dispatch(setOpponentChampion(data[name]))
}

export const fetchChampions = (): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const { selectedPatch } = state.champion

  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${selectedPatch}/data/en_US/champion.json`,
  ).then((res) => res.json())
  const championsWithAssets = Object.keys(data).reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: {
        ...acc[cur],
        square_asset: `http://ddragon.leagueoflegends.com/cdn/${selectedPatch}/img/champion/${cur}.png`,
      },
    }
  }, data)

  dispatch(chooseChampion('playerChampion', { value: JSON.stringify(championsWithAssets.Aatrox) }))
  dispatch(chooseChampion('opponentChampion', { value: JSON.stringify(championsWithAssets.Akali) }))
  dispatch(setChampions(championsWithAssets))
  dispatch(setChampionLoading(false))
}

export const fetchPatches = (): AppThunk => async (dispatch) => {
  const data = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then((res) =>
    res.json(),
  )
  const patch = { label: data[0], value: data[0] }

  dispatch(setPatches(data))
  dispatch(setSelectedPatch(patch))
}

export const selectSelectedStat = (state: RootState) => state.champion.selectedStat
export const selectChampionLoading = (state: RootState) => state.champion.loading
export const selectPlayerChampion = (state: RootState) => state.champion.playerChampion
export const selectOpponentChampion = (state: RootState) => state.champion.opponentChampion
export const selectChampions = (state: RootState) => state.champion.champions
export const selectChampionMultiLineGraph = (state: RootState) => {
  const { playerChampion, opponentChampion, selectedStat } = state.champion

  if (!playerChampion && !opponentChampion) return []

  const playerStats = playerChampion?.stats
  const opponentStats = opponentChampion?.stats
  const statPerLevel = `${selectedStat}perlevel`

  return [...Array(18).keys()].map((level) => {
    return {
      level: level + 1,
      ...(playerStats && { value1: level * playerStats[statPerLevel] + playerStats[selectedStat] }),
      ...(opponentStats && {
        value2: level * opponentStats[statPerLevel] + opponentStats[selectedStat],
      }),
    }
  })
}

export const selectSelectedPatch = (state: RootState) => state.champion.selectedPatch
export const selectPatches = (state: RootState) => state.champion.patches
export const selectLoreLink = (state: RootState) => state.champion.loreLink

export default championSlice.reducer
