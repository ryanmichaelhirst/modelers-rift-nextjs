import React from 'react'
import ChampionCard from './ChampionCard'
import LineGraph from './LineGraph'

const Champion = ({ champion }: { champion: any }) => {
  if (!champion) return null

  const lineData = champion.stats
    ? [...Array(18).keys()]
        .filter((level) => level !== 0)
        .map((level) => {
          return {
            level: level,
            value: level * champion.stats.attackdamageperlevel + champion.stats.attackdamage,
          }
        })
    : []

  return (
    <div className='mt-10 flex-1'>
      <ChampionCard champion={champion} />
      <LineGraph id={`line-${champion.name}`} data={lineData} xLabel='level' yLabel='value' />
    </div>
  )
}

export default Champion
