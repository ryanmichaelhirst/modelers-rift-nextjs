import { SET_SELECTED_SKIN } from '@customtypes/index'
import {
  AddPhotoAlternate,
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material'
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { capitalizeWord } from '../../bin/utils'
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
    return (
      <div className='h-full' key={skin.id}>
        <div
          title={skin?.name}
          key={skin?.id}
          className='cursor-pointer h-4/6 px-4 bg-cover mx-2 rounded'
          style={{
            backgroundImage: `url(${getSplashArtLink(championName, skin.num || 0)})`,
          }}
          onClick={onClick(skin?.num)}
        />
        <p className='text-center capitalize mt-2'>{skin?.name}</p>
      </div>
    )
  })
  const chromas = Array.from(Array(19).keys())
    .filter((k) => !skins?.some((i) => i.num === k))
    .map((num, idx) => (
      <div key={num} className='h-full mr-2'>
        <div
          title={`Add image suggestion`}
          key={num}
          className='h-4/6 flex items-center justify-center'
        >
          <AddPhotoAlternate className='h-4/6 w-1/2 text-white' />
        </div>
        <p className='text-center cursor-pointer' onClick={onClick(num)}>
          Chroma #{idx}
        </p>
      </div>
    ))
  const skinOptions = baseSkins?.concat(chromas).filter(Boolean)

  return (
    <div id='carousel' className='overflow-x-hidden'>
      <CarouselProvider
        naturalSlideHeight={60}
        naturalSlideWidth={100}
        totalSlides={skinOptions?.length || 0}
        visibleSlides={3}
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
