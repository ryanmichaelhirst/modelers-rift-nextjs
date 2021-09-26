import { selectPlayerChampion } from '@store/slices/championSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
import ChampionModel from './ChampionModel'
import ChampionSkinSelect from './ChampionSkinSelect'

const ChampionModelContainer = ({ name }: { name: string }) => {
  const champion = useSelector(selectPlayerChampion)
  const skins = champion?.skins?.map((s: any) => ({
    ...s,
    src: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_${s.num}.jpg`,
  }))

  return (
    <Card>
      <ChampionModel name={name} />
      <ChampionSkinSelect skins={skins} />
    </Card>
  )
}

export default ChampionModelContainer
