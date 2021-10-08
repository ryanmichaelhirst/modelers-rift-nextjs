import React from 'react'
import Skin0 from '@components/aatrox/skin0'
import Skin1 from '@components/aatrox/skin1'
import Skin2 from '@components/aatrox/skin2'

const Aatrox = ({ glb, skin }: { glb?: any; skin: string }) => {
  switch (skin) {
    case 'skin0':
      return <Skin0 glb={glb} />
    case 'skin1':
      return <Skin1 glb={glb} />
    case 'skin2':
      return <Skin2 glb={glb} />
    default:
      return null
  }
}

export default Aatrox
