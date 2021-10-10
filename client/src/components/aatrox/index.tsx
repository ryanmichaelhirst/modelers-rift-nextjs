import Skin0 from '@components/aatrox/skin0'
import Skin1 from '@components/aatrox/skin1'
import Skin2 from '@components/aatrox/skin2'
import React from 'react'

const Aatrox = ({ glb, skin }: { glb?: any; skin: string }) => {
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
