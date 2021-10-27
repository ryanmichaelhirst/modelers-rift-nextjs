import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { selectPlayerChampion } from '@store/slices/championSlice'
import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import ChampionSkinSelect from './ChampionSkinSelect'

const ChampionModelContainer = () => {
  const champion = useSelector(selectPlayerChampion)
  const { file, awsUrl } = champion?.model || { file: '', awsUrl: '' }

  const skins = champion?.skins?.map((s: any) => ({
    ...s,
    src: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_${s.num}.jpg`,
  }))

  const name = champion?.name?.toLowerCase() || 'aatrox'

  const Component = lazy(() => import(`./models/${name}/${file}.tsx`))

  return (
    <div>
      <Canvas style={{ height: '70vh' }}>
        <Suspense fallback={null}>
          <Component name={name} skin={file} glb={awsUrl} />
          <OrbitControls />
          <PerspectiveCamera makeDefault position={[300, 300, -500]} />
        </Suspense>
      </Canvas>
      <ChampionSkinSelect type={'playerChampion'} name={name} skins={skins} />
    </div>
  )
}

export default ChampionModelContainer
