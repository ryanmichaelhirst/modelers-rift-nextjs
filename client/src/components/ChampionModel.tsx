import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { selectSkin } from '@store/slices/championSlice'
import Aatrox from '@components/aatrox'

const ChampionModel = ({ name }: { name: string }) => {
  const skin = useSelector(selectSkin)

  return (
    <Canvas style={{ height: '70vh' }}>
      <Suspense fallback={null}>
        <Aatrox skin={skin} />
        {/** @ts-ignore */}
        <OrbitControls />
        {/** @ts-ignore */}
        <PerspectiveCamera makeDefault position={[300, 300, -500, 1000]} />
      </Suspense>
    </Canvas>
  )
}

export default ChampionModel
