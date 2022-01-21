import Champion from '@components/Champion'
import MultiLineGraph from '@components/MultiLineGraph'
import { STAT_OPTIONS } from '@customtypes/constants'
import { ChampionStatsKey } from '@customtypes/index'
import { useMemo } from 'react'
import { useAppContext } from '../context'

const ChampionComparison = () => {
  const [{ selectedChampion }, dispatch] = useAppContext()
  const statKey = 'armor'

  const multiLineData = useMemo(() => {
    if (!selectedChampion) return []

    const championStats = selectedChampion.basicInfo?.stats
    const levelKey = `${statKey}perlevel` as ChampionStatsKey

    if (!championStats) return []
    const stat = championStats[statKey] || 0
    const statPerLevel = championStats[levelKey] || 0

    return [...Array(18).keys()].map((level) => {
      return {
        level: level + 1,
        ...(championStats && {
          value1: level * statPerLevel + stat,
        }),
        ...(championStats && {
          value2: level * statPerLevel + stat,
        }),
      }
    })
  }, [selectedChampion, statKey])

  const tooltipTitle = STAT_OPTIONS.find((s) => s.value === statKey)?.label
  const tooltipTitles = [selectedChampion?.basicInfo?.name || '', '']

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
            <Champion champion={selectedChampion} />
          </div>
          <div>{/* <Champion champion={opponentChampion} /> */}</div>
        </div>
      </div>
    </div>
  )
}

export default ChampionComparison
