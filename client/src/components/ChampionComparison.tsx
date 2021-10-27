import Champion from '@components/Champion'
import MultiLineGraph from '@components/MultiLineGraph'
import { STAT_OPTIONS } from '@customtypes/constants'
import { fetchItems } from '@store/slices/itemSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectChampionMultiLineGraph,
  selectChampions,
  selectOpponentChampion,
  selectPlayerChampion,
  selectSelectedStat,
} from '../store/slices/championSlice'

const ChampionComparison = () => {
  const dispatch = useDispatch()
  const champions = useSelector(selectChampions)

  const playerChampion = useSelector(selectPlayerChampion)
  const opponentChampion = useSelector(selectOpponentChampion)
  const multiLineData = useSelector(selectChampionMultiLineGraph)
  const selectedStat = useSelector(selectSelectedStat)

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

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
