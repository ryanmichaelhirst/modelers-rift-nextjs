import Aatrox from '@components/aatrox/index'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { selectSkin } from '@store/slices/championSlice'
import { Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ChampionModel = ({ name }: { name: string }) => {
  const skin = useSelector(selectSkin)
  const [loadedSkin, setLoadedSkin] = useState<string>()
  const [glb, setGlb] = useState<string>()

  useEffect(() => {
    const getData = async () => {
      console.time('get-model-req')
      setGlb(undefined)
      const res = await (await fetch(`/api/getChampionModels/${name}`)).json()
      const model = res.models.find((m: any) => m.name === `${skin}.glb`)
      const url = `/api/getAwsObject/${name}/${model.name}`
      // 'https://league-glb-models.s3.amazonaws.com/aatrox/skin0.glb'
      setGlb(url)
      setLoadedSkin(model.name.replace('.glb', ''))
      console.log({ res, model, glb, skin, url })
      console.timeEnd('get-model-req')
    }

    getData()
  }, [skin])

  console.log({ loadedSkin, skin })

  return (
    <Canvas style={{ height: '70vh' }}>
      <Suspense fallback={null}>
        {loadedSkin === skin && <Aatrox skin={skin} glb={glb} />}
        {/** @ts-ignore */}
        <OrbitControls />
        {/** @ts-ignore */}
        <PerspectiveCamera makeDefault position={[300, 300, -500, 1000]} />
      </Suspense>
    </Canvas>
  )
}

export default ChampionModel
