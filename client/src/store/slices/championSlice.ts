import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChampionState, SelectOption } from '../../types'
import { AppThunk, RootState } from '../index'

const initialState: ChampionState = {
  loading: true,
  selectedStat: 'attackdamage',
  champions: {},
  patches: [],
  loreLink: 'https://universe.leagueoflegends.com/en_US/champion/brand/',
  playerChampion: {
    name: 'Aatrox',
    model: {
      file: 'skin0',
      awsUrl: '/api/getAwsObject/aatrox/skin0',
    },
    tags: [],
    passive: {
      image: {
        full: '',
      },
    },
    spells: [],
    stats: [],
    skins: [],
    allytips: [],
    enemytips: [],
    info: {},
  },
  selectedPatch: null,
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
    setSelectedPatch: (state, action: PayloadAction<string>) => {
      state.selectedPatch = action.payload
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

export const fetchPatches = (): AppThunk => async (dispatch) => {
  const data = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then((res) =>
    res.json(),
  )

  dispatch(setPatches(data))
  dispatch(setSelectedPatch(data[0]))
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
