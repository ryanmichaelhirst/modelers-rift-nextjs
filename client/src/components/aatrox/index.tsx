import Skin0 from '@components/aatrox/skin0'
import Skin1 from '@components/aatrox/skin1'
import Skin2 from '@components/aatrox/skin2'
import { useEffect, useState } from 'react'

const Aatrox = ({ skin }: { skin: string }) => {
  const [blob, setBlob] = useState<any>()

  useEffect(() => {
    const getData = async () => {
      console.time('get-model-req')
      const res1 = await (await fetch(`/api/getChampionModels/aatrox`)).json()
      const [folder, file] = res1.glbs[0].Key.split('/')

      const res2 = await (await fetch(`/api/getAwsObject/${folder}/${file}`)).json()

      // 'model/gltf-binary'
      // 'https://league-glb-models.s3.amazonaws.com/aatrox/skin0.glb'
      const blob = new Blob([res2.binaryStr], { type: 'models/gltf-binary' })
      const url = URL.createObjectURL(blob)

      setBlob('https://league-glb-models.s3.amazonaws.com/aatrox/skin0.glb')
      // setBlob(url)
      // try {
      //   const module = await import(url)
      //   console.log({ module })
      //   setBlob(module)
      // } catch (err) {
      //   console.error(err)
      // }

      console.log({ folder, file, blob, url })
      console.timeEnd('get-model-req')
    }

    getData()
  }, [])

  if (!blob) return null

  switch (skin) {
    case 'skin0':
      return <Skin0 glb={blob} timerLabel={`aatrox-${skin}`} />
    case 'skin1':
      return <Skin1 glb={blob} timerLabel={`aatrox-${skin}`} />
    case 'skin2':
      return <Skin2 glb={blob} timerLabel={`aatrox-${skin}`} />
    default:
      return null
  }
}

export default Aatrox
