import Skin0 from '@components/aatrox/skin0'
import Skin1 from '@components/aatrox/skin1'
import Skin2 from '@components/aatrox/skin2'
import { useEffect, useState } from 'react'

const Aatrox = ({ skin }: { skin: string }) => {
  const [glb, setGlb] = useState()
  const [obj, setObj] = useState()

  useEffect(() => {
    const getData = async () => {
      const res1 = await (await fetch(`/api/getChampionModels/aatrox`)).json()
      const [folder, file] = res1.glbs[0].Key.split('/')

      console.log({ folder, file })
      const res2 = await (
        await fetch(`/api/getAwsObject/${folder}/${file}`, {
          headers: {
            'Content-Type': 'model/gltf-binary',
          },
        })
      ).json()

      setGlb(res1)
      setObj(res2)
    }

    getData()
  }, [])

  console.log(glb)
  // console.log(obj)

  return null

  switch (skin) {
    case 'skin0':
      return <Skin0 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin1':
      return <Skin1 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin2':
      return <Skin2 glb={glb} timerLabel={`aatrox-${skin}`} />
    default:
      return null
  }
}

export default Aatrox
