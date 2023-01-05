import Image from 'next/image'
import { FC } from 'react'

export const Carousel: FC<{ items?: string[] }> = ({ items }) => {
  return (
    <div className='slider relative m-auto overflow-hidden' aria-label='React Carousel'>
      <div className='slide-track flex animate-pan'>
        {items?.map((i) => (
          <div key={i} className='slide'>
            <Image src={i} width='150px' height='170px' />
          </div>
        ))}

        {items?.map((i) => (
          <div key={`${i}-copy`} className='slide'>
            <Image src={i} width='150px' height='170px' />
          </div>
        ))}
      </div>
    </div>
  )
}
