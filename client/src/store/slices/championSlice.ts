import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../index'

interface ChampionState {
  loading: boolean
  selectedStat: string
  champions: Record<string, Record<string, any>>
  playerChampion?: Record<string, any>
  opponentChampion?: Record<string, any>
}

const initialState: ChampionState = {
  loading: true,
  selectedStat: 'attackdamage',
  champions: {},
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
  },
})

export const chooseChampion = (type: string, payload: { value: string }): AppThunk => async (dispatch) => {
  const json = JSON.parse(payload.value)
  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion/${json.name}.json`,
  ).then((res) => res.json())
  const name = json.name
  if (type === 'playerChampion') dispatch(setPlayerChampion(data[name]))
  if (type === 'opponentChampion') dispatch(setOpponentChampion(data[name]))
}

export const fetchChampions = (): AppThunk => async (dispatch) => {
  const { data } = await fetch('http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion.json').then((res) =>
    res.json(),
  )
  const championsWithAssets = Object.keys(data).reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: {
        ...acc[cur],
        square_asset: `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${cur}.png`,
      },
    }
  }, data)

  dispatch(setChampions(championsWithAssets))
  dispatch(setChampionLoading(false))
}

export const {
  setChampions,
  setPlayerChampion,
  setOpponentChampion,
  setChampionLoading,
  setSelectedStat,
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

export default championSlice.reducer
