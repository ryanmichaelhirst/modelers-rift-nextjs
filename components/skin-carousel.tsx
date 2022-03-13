import { SET_SELECTED_SKIN } from '@customtypes/index'
import {
  AddPhotoAlternate,
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material'
import { capitalizeWord } from '@utils/index'
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
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

  const baseSkins = skins?.map((skin) => (
    <div
      key={skin.id}
      title={skin?.name}
      className='cursor-pointer h-full bg-cover rounded-lg mr-2'
      style={{
        backgroundImage: `url(${getSplashArtLink(championName, skin.num || 0)})`,
      }}
      onClick={onClick(skin?.num)}
    />
  ))
  const chromas = Array.from(Array(19).keys())
    .filter((k) => !skins?.some((i) => i.num === k))
    .map((num) => (
      <div
        title={`Add image suggestion`}
        key={num}
        className='h-full flex items-center justify-center mr-2'
      >
        <AddPhotoAlternate className='h-full w-1/2 text-white' />
      </div>
    ))
  const skinOptions = baseSkins?.concat(chromas).filter(Boolean)

  return (
    <div id='carousel' className='overflow-x-hidden'>
      <CarouselProvider
        naturalSlideHeight={50}
        naturalSlideWidth={100}
        totalSlides={skinOptions?.length || 0}
        visibleSlides={5}
        infinite
      >
        <Slider>
          {skinOptions?.map((s, idx) => (
            <Slide index={idx} key={s.key}>
              {s}
            </Slide>
          ))}
        </Slider>
        <div className='flex justify-center items-center mt-2'>
          <ButtonBack>
            <ArrowBackIosNewOutlined className='cursor-pointer text-white' fontSize='medium' />
          </ButtonBack>
          <ButtonNext>
            <ArrowForwardIosOutlined className='cursor-pointer text-white' fontSize='medium' />
          </ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  )
}

export default SkinCarousel
