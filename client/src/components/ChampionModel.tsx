import Aatrox from '@components/aatrox/index'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { selectSkin } from '@store/slices/championSlice'
import React, { Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ChampionModel = ({ name }: { name: string }) => {
  const skin = useSelector(selectSkin)
  const [glb, setGlb] = useState<any>()
  const [skinName, setSkinName] = useState('')

  useEffect(() => {
    const getGlb = async () => {
      setGlb(undefined)

      const module = await import(`../assets/aatrox/${skin}.glb`)
      console.log({ module })
      setGlb(module.default)
      setSkinName(skin)
    }

    skin && getGlb()
  }, [skin])

  console.log({ skin, skinName, glb })

  return (
    <Canvas style={{ height: '70vh' }}>
      <Suspense fallback={null}>
        {skin === skinName && <Aatrox glb={glb} skin={skin} />}
        {/** @ts-ignore */}
        <OrbitControls />
        {/** @ts-ignore */}
        <PerspectiveCamera makeDefault position={[300, 300, -500, 1000]} />
      </Suspense>
    </Canvas>
  )
}

export default ChampionModel
