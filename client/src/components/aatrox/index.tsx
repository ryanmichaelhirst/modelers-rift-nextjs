import React from 'react'
import Skin0 from '@components/aatrox/skin0'
import Skin1 from '@components/aatrox/skin1'
import Skin2 from '@components/aatrox/skin2'
import Skin3 from '@components/aatrox/skin3'

const Aatrox = ({ skin }: { skin: string }) => {
  const Comp =
    skin === 'skin1' ? Skin1 : skin === 'skin2' ? Skin2 : skin === 'skin3' ? Skin3 : Skin0

  return <Comp />
}

export default Aatrox
