import { SET_SELECTED_SKIN } from '@customtypes/index'
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
import { capitalizeWord } from '../../../bin/utils'
import { useAppContext } from '../context'
import { getSplashArtLink } from '../utils'

export const SkinCarousel = () => {
  const [{ selectedChampion }, dispatch] = useAppContext()
  const championName = capitalizeWord(selectedChampion.basicInfo?.name)
  const skins = selectedChampion.detailedInfo?.skins

  const onClick = (num?: number) => () => {
    const skinNum = `skin${num}`
    dispatch({ type: SET_SELECTED_SKIN, payload: skinNum })
  }

  const baseSkins = skins?.map((skin) => {
    const backgroundImage = `url(${getSplashArtLink(championName, skin.num || 0)})`

    return (
      <div
        title={skin?.name}
        key={skin?.id}
        className='py-5 px-4 bg-cover mx-2 h-14 w-14 rounded hover:border-gum-400 hover:border-2'
        style={{
          backgroundImage,
        }}
        onClick={onClick(skin?.num)}
      />
    )
  })
  const chromas = Array.from(Array(19).keys())
    .filter((k) => !skins?.some((i) => i.num === k))
    .map((num) => (
      <span title={`Chroma #${num}`} key={num} className='mr-2' onClick={onClick(num)}>
        {num}
      </span>
    ))
  const skinOptions = baseSkins?.concat(chromas)

  return (
    <div id='carousel' className='overflow-x-hidden'>
      <div className='flex justify-evenly items-center text-white'>
        <ArrowBackIosNewOutlined className='cursor-pointer' fontSize='medium' />
        <div className='flex justify-evenly items-center cursor-pointer'>{skinOptions}</div>
        <ArrowForwardIosOutlined className='cursor-pointer' fontSize='medium' />
      </div>
    </div>
  )
}

export default SkinCarousel
