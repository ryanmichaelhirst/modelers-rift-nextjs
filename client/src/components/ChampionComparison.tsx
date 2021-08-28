import React, { useState, useEffect } from 'react'
import ChampionSelect from './ChampionSelect'
import Champion from './Champion'
import MultiLineGraph from './MultiLineGraph'

const ChampionComparison = () => {
  const [champions, setChampions] = useState({})
  const [champion1, setChampion1] = useState()
  const [champion2, setChampion2] = useState()
  const [multi, setMulti] = useState([])

  useEffect(() => {
    const data = async () => {
      const req = await fetch('http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion.json').then((res) =>
        res.json(),
      )

      setChampions(req.data)
    }

    data()
  }, [])

  useEffect(() => {
    const data = async () => {
      const req1 = await fetch(
        `http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion/Aatrox.json`,
      ).then((res) => res.json())

      const req2 = await fetch(
        `http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion/Ashe.json`,
      ).then((res) => res.json())

      const playerStats = req1.data['Aatrox'].stats
      const opponentStats = req2.data['Ashe'].stats

      const data = [...Array(18).keys()].map((level) => {
        return {
          level: level + 1,
          value1: level * playerStats.attackdamageperlevel + playerStats.attackdamage,
          value2: level * opponentStats.attackdamageperlevel + opponentStats.attackdamage,
        }
      })
      setMulti(data)
    }

    data()
  }, [])

  console.log(multi)

  const onSelect = (name: string, obj: Record<string, string>) => {
    const json = JSON.parse(obj.value)

    if (name === 'champion-1') setChampion1(json)
    if (name === 'champion-2') setChampion2(json)
  }

  const selectOptions = Object.values(champions).map((c: any) => ({
    value: JSON.stringify(c),
    label: c.name ? c.name : '',
  }))

  return (
    <>
      <div>
        <MultiLineGraph
          data={multi}
          id='multi-graph'
          xLabel='level'
          yLabels={['value1', 'value2']}
          tooltipTitle={'Attack damage'}
          tooltipTitles={['Aatrox', 'Ashe']}
        />
      </div>
      <div className='mx-auto'>
        <ChampionSelect
          options={selectOptions}
          onChange={onSelect}
          name='champion-1'
          placeholder='Select your champion'
        />
        <ChampionSelect
          options={selectOptions}
          onChange={onSelect}
          name='champion-2'
          placeholder='Select your opponent'
        />
      </div>
      <div className='flex'>
        <Champion champion={champion1} />
        <Champion champion={champion2} />
      </div>
    </>
  )
}

export default ChampionComparison
