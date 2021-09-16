import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Aatrox from './Aatrox'
import Akali from './Akali'

const ChampionModel = ({ champion }: { champion: string }) => (
  <Canvas style={{ height: '100vh' }}>
    <Suspense fallback={null}>
      {champion === 'akali' ? <Akali /> : <Aatrox />}
      {/** @ts-ignore */}
      <OrbitControls />
      {/** @ts-ignore */}
      <PerspectiveCamera makeDefault position={[300, 300, -500, 1000]} />
    </Suspense>
  </Canvas>
)

export default ChampionModel
