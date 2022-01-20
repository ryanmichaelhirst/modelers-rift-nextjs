import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { lazy, Suspense } from 'react'
import { useAppContext } from '../context'

const ChampionModelContainer = () => {
  const [{ selectedChampion }] = useAppContext()

  const skinNum = selectedChampion.skin || 'skin0'
  const champName = selectedChampion.basicInfo?.name?.toLowerCase() || 'aatrox'
  const awsUrl = `/api/getAwsObject/${champName}/${skinNum}`

  const Component = lazy(() => import(`./models/${champName}/${skinNum}.tsx`))

  return (
    <div>
      <Canvas style={{ height: '70vh' }}>
        <Suspense fallback={null}>
          <Component name={champName} skin={skinNum} glb={awsUrl} />
          <OrbitControls />
          <PerspectiveCamera makeDefault position={[300, 300, -500]} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ChampionModelContainer
