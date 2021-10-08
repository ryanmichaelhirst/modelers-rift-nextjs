import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useSelector } from 'react-redux'
import { selectSkin } from '@store/slices/championSlice'
import Aatrox from '@components/aatrox/index'

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
