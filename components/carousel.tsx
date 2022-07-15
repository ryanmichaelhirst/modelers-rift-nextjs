import { FC } from 'react'

export const Carousel: FC<{ items: any[] }> = ({ items }) => {
  return (
    <div className='slider m-auto overflow-hidden relative' aria-label='React Carousel'>
      <div className='slide-track animate-pan flex'>
        {items.map((item, idx) => (
          <div key={idx} className='slide p-4'>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
