import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectPlayerChampion,
  selectOpponentChampion,
  selectChampions,
  fetchChampions,
  selectChampionMultiLineGraph,
  selectSelectedStat,
  fetchPatches,
  selectSelectedPatch,
  selectPatches,
} from '../store/slices/championSlice'
import ChampionSelect from './ChampionSelect'
import { fetchItems } from '../store/slices/itemSlice'
import Champion from './Champion'
import MultiLineGraph from './MultiLineGraph'
import StatSelect from './StatSelect'
import PatchSelect from './PatchSelect'
import { STAT_OPTIONS } from '../types/constants'
import ItemGrid from './ItemGrid'

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
    dispatch(fetchItems())
  }, [])

  useEffect(() => {
    if (selectedPatch) dispatch(fetchChampions())
  }, [selectedPatch])

  const tooltipTitle = STAT_OPTIONS.find((s) => s.value === selectedStat).label
  const tooltipTitles = [playerChampion?.name || '', opponentChampion?.name || '']

  const championOptions = Object.values(champions).map((c: any) => ({
    value: JSON.stringify(c),
    label: c.name ? c.name : '',
    icon: c.square_asset,
  }))
  const patchOptions = patches.map((c: any) => ({ label: c, value: c }))

  return (
    <div className='flex'>
      <div className='flex-1 mr-3'>
        <PatchSelect
          options={patchOptions}
          value={selectedPatch}
          name='selectedPatch'
          placeholder='Select patch'
        />
        <StatSelect options={STAT_OPTIONS} name='selectedStat' placeholder='Select stat' />
        <div className='mt-4' />
        <MultiLineGraph
          data={multiLineData}
          id='multi-graph'
          xLabel='level'
          yLabels={['value1', 'value2']}
          tooltipTitle={tooltipTitle}
          tooltipTitles={tooltipTitles}
        />
      </div>
      <div className='flex-1 ml-3'>
        <div>
          <ChampionSelect
            value={playerChampion}
            options={championOptions}
            name='playerChampion'
            placeholder='Select your champion'
          />
          <ChampionSelect
            value={opponentChampion}
            options={championOptions}
            name='opponentChampion'
            placeholder='Select opponent'
          />
        </div>
        <div className='flex'>
          <div>
            <Champion champion={playerChampion} />
            <ItemGrid />
          </div>
          <div>
            <Champion champion={opponentChampion} />
            <ItemGrid />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChampionComparison
