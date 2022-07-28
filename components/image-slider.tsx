import { useAppContext } from '@context/index'
import { SET_SELECTED_SKIN } from '@customtypes/index'
import { useCharacterQuery } from '@graphql/generated/types'
import {
  AddPhotoAlternate,
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material'
import { capitalize, getSplashArtLink } from '@utils/index'
import classNames from 'classnames'
import { useRef, useState } from 'react'

// https://codesandbox.io/s/88o1v1qz92
export const ImageSlider = () => {
  const [{ selectedChampion }, dispatch] = useAppContext()
  const [current, setCurrent] = useState(0)
  const ulRef = useRef<HTMLUListElement>(null)

  const { data, loading, error } = useCharacterQuery({
    variables: {
      filter: {
        nameEq: selectedChampion.basicInfo?.name?.toLowerCase(),
      },
      includeAssets: true,
    },
  })

  const onClick = (skin?: string | null) => () => {
    if (!skin) return

    dispatch({ type: SET_SELECTED_SKIN, payload: skin })
  }

  const lolSkins = selectedChampion.detailedInfo?.skins ?? []
  const models = data?.character?.assets?.filter((a) => a?.type === 'model') ?? []
  const slides =
    lolSkins
      .map((skin) => {
        const championName = capitalize(selectedChampion.basicInfo?.name)

        return (
          <div
            key={skin.id}
            title={skin?.name}
            className={classNames(
              'cursor-pointer w-full h-[32px] bg-cover rounded-lg mr-2 opacity-30',
              {
                '!opacity-100': selectedChampion.skin === `skin${skin?.num}`,
              },
            )}
            style={{
              backgroundImage: `url(${getSplashArtLink(championName, skin.num || 0)})`,
            }}
            onClick={onClick(`skin${skin?.num}`)}
          />
        )
      })
      .concat(
        // chroma skins
        models
          .filter((m) => !lolSkins.find((s) => `skin${s.num}` === m?.skin))
          .map((m) => (
            <div
              title={`Add image suggestion`}
              key={m?.id}
              className='cursor-pointer w-full h-[32px] flex items-center justify-center mr-2'
              onClick={onClick(m?.skin)}
            >
              <AddPhotoAlternate className='h-full w-1/2 text-slate-400' />
            </div>
          )),
      ) ?? []

  const onNext = () => {
    setCurrent((prev) => {
      let newCurrent = prev + 1
      if (newCurrent + 1 > slides.length - 3) newCurrent = 0
      onTranslate(newCurrent)

      return newCurrent
    })
  }

  const onPrev = () => {
    setCurrent((prev) => {
      let newCurrent = prev - 1
      if (newCurrent < 0) newCurrent = slides.length - 6
      onTranslate(newCurrent)

      return newCurrent
    })
  }

  const onTranslate = (position: number) => {
    if (!ulRef.current) return

    const translateValue = -(position * 33.333333)
    ulRef.current.style.transform = `translateX(${translateValue}%)`
    ulRef.current.style.transition = 'transform 0.5s ease-in-out'
  }

  if (slides.length === 0) return null

  return (
    <div className='flex items-center justify-center'>
      <ArrowBackIosNewOutlined
        className='cursor-pointer text-primary'
        fontSize='medium'
        onClick={onPrev}
      />
      <div className='flex items-center justify-center w-full overflow-hidden'>
        <ul className='list-none p-4 m-0 flex w-full translate-x-0' ref={ulRef}>
          {slides.map((item, i) => (
            <li className='w-1/3 shrink-0 flex items-center justify-center' key={i}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <ArrowForwardIosOutlined
        className='cursor-pointer text-primary'
        fontSize='medium'
        onClick={onNext}
      />
    </div>
  )
}
