import React, { useState, useEffect } from 'react'
import ChampionSelect from './ChampionSelect'
import Champion from './Champion'

const ChampionComparison = () => {
  const [champions, setChampions] = useState({})
  const [champion1, setChampion1] = useState()
  const [champion2, setChampion2] = useState()

  useEffect(() => {
    const data = async () => {
      const req = await fetch('http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion.json').then((res) =>
        res.json(),
      )

      setChampions(req.data)
    }

    data()
  }, [])

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
