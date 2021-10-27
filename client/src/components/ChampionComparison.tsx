import Champion from '@components/Champion'
import MultiLineGraph from '@components/MultiLineGraph'
import StatSelect from '@components/StatSelect'
import { STAT_OPTIONS } from '@customtypes/constants'
import { fetchItems } from '@store/slices/itemSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchChampions,
  fetchPatches,
  selectChampionMultiLineGraph,
  selectChampions,
  selectOpponentChampion,
  selectPlayerChampion,
  selectSelectedPatch,
  selectSelectedStat,
} from '../store/slices/championSlice'

const ChampionComparison = () => {
  const dispatch = useDispatch()
  const champions = useSelector(selectChampions)

  const playerChampion = useSelector(selectPlayerChampion)
  const opponentChampion = useSelector(selectOpponentChampion)
  const multiLineData = useSelector(selectChampionMultiLineGraph)
  const selectedStat = useSelector(selectSelectedStat)
  const selectedPatch = useSelector(selectSelectedPatch)

  useEffect(() => {
    dispatch(fetchPatches())
    dispatch(fetchItems())
  }, [])

  useEffect(() => {
    if (selectedPatch) dispatch(fetchChampions())
  }, [selectedPatch])

  const tooltipTitle = STAT_OPTIONS.find((s) => s.value === selectedStat)?.label
  const tooltipTitles = [playerChampion?.name || '', opponentChampion?.name || '']

  const championOptions = Object.values(champions).map((c: any) => ({
    value: JSON.stringify(c),
    label: c.name ? c.name : '',
    icon: c.square_asset,
  }))

  return (
    <div className='flex'>
      <div className='flex-1 mr-3'>
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
        <div className='flex'>
          <div>
            <Champion champion={playerChampion} />
          </div>
          <div>
            <Champion champion={opponentChampion} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChampionComparison
