import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Aatrox from '@components/Aatrox'
import Akali from '@components/Akali'

const ChampionModel = ({ name }: { name: string }) => (
  <Canvas style={{ height: '70vh' }}>
    <Suspense fallback={null}>
      {name === 'akali' ? <Akali /> : <Aatrox />}
      {/** @ts-ignore */}
      <OrbitControls />
      {/** @ts-ignore */}
      <PerspectiveCamera makeDefault position={[300, 300, -500, 1000]} />
    </Suspense>
  </Canvas>
)

export default ChampionModel
