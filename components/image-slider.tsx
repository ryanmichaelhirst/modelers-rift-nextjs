import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
import { FC, useRef, useState } from 'react'

// https://codesandbox.io/s/88o1v1qz92?file=/src/index.js
export const ImageSlider: FC<{ slides: JSX.Element[] }> = ({ slides }) => {
  const [current, setCurrent] = useState(0)
  const ulRef = useRef<HTMLUListElement>(null)

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
