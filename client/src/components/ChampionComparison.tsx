import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectPlayerChampion,
  selectOpponentChampion,
  selectChampions,
  fetchChampions,
  selectChampionMultiLineGraph,
  stats,
  selectSelectedStat,
  fetchPatches,
  selectSelectedPatch,
  selectPatches,
} from '../store/slices/championSlice'
import ChampionSelect from './ChampionSelect'
import Champion from './Champion'
import MultiLineGraph from './MultiLineGraph'
import StatSelect from './StatSelect'
import PatchSelect from './PatchSelect'

const ChampionComparison = () => {
  const dispatch = useDispatch()
  const champions = useSelector(selectChampions)
  const playerChampion = useSelector(selectPlayerChampion)
  const opponentChampion = useSelector(selectOpponentChampion)
  const multiLineData = useSelector(selectChampionMultiLineGraph)
  const selectedStat = useSelector(selectSelectedStat)
  const selectedPatch = useSelector(selectSelectedPatch)
  const patches = useSelector(selectPatches)

  useEffect(() => {
    dispatch(fetchPatches())
  }, [])

  useEffect(() => {
    if (selectedPatch) dispatch(fetchChampions())
  }, [selectedPatch])

  const tooltipTitle = stats.find((s) => s.value === selectedStat).label
  const tooltipTitles = [playerChampion?.name || '', opponentChampion?.name || '']

  const selectOptions = Object.values(champions).map((c: any) => ({
    value: JSON.stringify(c),
    label: c.name ? c.name : '',
    icon: c.square_asset,
  }))
  const patchOptions = patches.map((c: any) => ({ label: c, value: c }))

  return (
    <>
      <div>
        <PatchSelect
          options={patchOptions}
          value={selectedPatch}
          name='selectedPatch'
          placeholder='Select patch'
        />
        <StatSelect options={stats} name='selectedStat' placeholder='Select stat' />
        <MultiLineGraph
          data={multiLineData}
          id='multi-graph'
          xLabel='level'
          yLabels={['value1', 'value2']}
          tooltipTitle={tooltipTitle}
          tooltipTitles={tooltipTitles}
        />
      </div>
      <div className='mx-auto'>
        <ChampionSelect
          options={selectOptions}
          name='playerChampion'
          placeholder='Select your champion'
        />
        <ChampionSelect
          options={selectOptions}
          name='opponentChampion'
          placeholder='Select opponent'
        />
      </div>
      <div className='flex'>
        <Champion champion={playerChampion} />
        <Champion champion={opponentChampion} />
      </div>
    </>
  )
}

export default ChampionComparison
