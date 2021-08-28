import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../index'

interface ChampionState {
  loading: boolean
  selectedStat: string
  champions: Record<string, Record<string, any>>
  playerChampion?: Record<string, any>
  opponentChampion?: Record<string, any>
  versions: string[]
  selectedVersion?: string
}

const initialState: ChampionState = {
  loading: true,
  selectedStat: 'attackdamage',
  champions: {},
  versions: [],
}

export const stats = [
  { label: 'Attack Damage', value: 'attackdamage' },
  { label: 'Armor', value: 'armor' },
  { label: 'Magic Resist', value: 'spellblock' },
  { label: 'Health', value: 'hp' },
  { label: 'Mana', value: 'mp' },
  { label: 'Health Regen', value: 'hpregen' },
  { label: 'Mana Regen', value: 'mpregen' },
  { label: 'Crit', value: 'crit' },
  { label: 'Attack Speed', value: 'attackspeed' },
]

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
    setSelectedStat: (state, action: PayloadAction<{ value: string; label: string }>) => {
      state.selectedStat = action.payload.value
    },
    setVersions: (state, action: PayloadAction<any>) => {
      state.versions = action.payload
    },
    setSelectedVersion: (state, action: PayloadAction<any>) => {
      state.selectedVersion = action.payload.value
    },
  },
})

export const chooseChampion = (type: string, payload: { value: string }): AppThunk => async (dispatch, getState) => {
  const json = JSON.parse(payload.value)
  const state = getState()
  const selectedVersion = state.champion.selectedVersion

  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${selectedVersion}/data/en_US/champion/${json.name}.json`,
  ).then((res) => res.json())
  const name = json.name

  if (type === 'playerChampion') dispatch(setPlayerChampion(data[name]))
  if (type === 'opponentChampion') dispatch(setOpponentChampion(data[name]))
}

export const fetchChampions = (): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const selectedVersion = state.champion.selectedVersion

  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${selectedVersion}/data/en_US/champion.json`,
  ).then((res) => res.json())
  const championsWithAssets = Object.keys(data).reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: {
        ...acc[cur],
        square_asset: `http://ddragon.leagueoflegends.com/cdn/${selectedVersion}/img/champion/${cur}.png`,
      },
    }
  }, data)

  dispatch(setChampions(championsWithAssets))
  dispatch(setChampionLoading(false))
}

export const fetchVersions = (): AppThunk => async (dispatch) => {
  const data = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then((res) => res.json())
  dispatch(setVersions(data))
  dispatch(setSelectedVersion(data[0]))
}

export const {
  setChampions,
  setPlayerChampion,
  setOpponentChampion,
  setChampionLoading,
  setSelectedStat,
  setSelectedVersion,
  setVersions,
} = championSlice.actions

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
      ...(opponentStats && { value2: level * opponentStats[statPerLevel] + opponentStats[selectedStat] }),
    }
  })
}

export const selectSelectedVersion = (state: RootState) => state.champion.selectedVersion
export const selectVersions = (state: RootState) => state.champion.versions

export default championSlice.reducer
