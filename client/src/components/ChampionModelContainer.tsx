import { selectPlayerChampion } from '@store/slices/championSlice'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
import ChampionModel from './ChampionModel'
import ChampionSkinSelect from './ChampionSkinSelect'

const ChampionModelContainer = () => {
  const [loadedChampion, setLoadedChampion] = useState<string>()
  const champion = useSelector(selectPlayerChampion)
  const skins = champion?.skins?.map((s: any) => ({
    ...s,
    src: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_${s.num}.jpg`,
  }))

  useEffect(() => {
    setLoadedChampion(champion?.name)
  }, [champion])

  console.log({ skins, champion })

  return (
    <Card>
      {loadedChampion !== champion?.name ? (
        <p>Loading...</p>
      ) : (
        <ChampionModel name={champion?.name.toLowerCase()} />
      )}
      <ChampionSkinSelect skins={skins} />
    </Card>
  )
}

export default ChampionModelContainer
