import React from 'react'
import Skin0 from '@components/aatrox/Skin0'
import Skin1 from '@components/aatrox/Skin1'
import Skin2 from '@components/aatrox/Skin10'
import Skin3 from '@components/aatrox/Skin11'

const Aatrox = ({ skin }: { skin: string }) => {
  const Comp =
    skin === 'skin1' ? Skin1 : skin === 'skin2' ? Skin2 : skin === 'skin3' ? Skin3 : Skin0

  return <Comp />
}

export default Aatrox
