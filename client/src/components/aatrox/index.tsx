import Skin0 from '@components/aatrox/skin0'
import Skin1 from '@components/aatrox/skin1'
import Skin10 from '@components/aatrox/skin10'
import Skin11 from '@components/aatrox/skin11'
import Skin12 from '@components/aatrox/skin12'
import Skin13 from '@components/aatrox/skin13'
import Skin14 from '@components/aatrox/skin14'
import Skin15 from '@components/aatrox/skin15'
import Skin16 from '@components/aatrox/skin16'
import Skin17 from '@components/aatrox/skin17'
import Skin18 from '@components/aatrox/skin18'
import Skin19 from '@components/aatrox/skin19'
import Skin2 from '@components/aatrox/skin2'
import Skin3 from '@components/aatrox/skin3'
import Skin4 from '@components/aatrox/skin4'
import Skin5 from '@components/aatrox/skin5'
import Skin6 from '@components/aatrox/skin6'
import Skin7 from '@components/aatrox/skin7'
import Skin8 from '@components/aatrox/skin8'
import Skin9 from '@components/aatrox/skin9'

const Aatrox = ({ skin, glb }: { skin: string; glb?: any }) => {
  if (!glb) return null

  switch (skin) {
    case 'skin0':
      return <Skin0 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin1':
      return <Skin1 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin2':
      return <Skin2 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin3':
      return <Skin3 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin4':
      return <Skin4 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin5':
      return <Skin5 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin6':
      return <Skin6 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin7':
      return <Skin7 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin8':
      return <Skin8 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin9':
      return <Skin9 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin10':
      return <Skin10 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin11':
      return <Skin11 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin12':
      return <Skin12 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin13':
      return <Skin13 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin14':
      return <Skin14 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin15':
      return <Skin15 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin16':
      return <Skin16 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin17':
      return <Skin17 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin18':
      return <Skin18 glb={glb} timerLabel={`aatrox-${skin}`} />
    case 'skin19':
      return <Skin19 glb={glb} timerLabel={`aatrox-${skin}`} />

    default:
      return null
  }
}

export default Aatrox
