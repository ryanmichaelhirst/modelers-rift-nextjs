import Alistar from '@components/assets/Alistar.svg'
import Amumu from '@components/assets/Amumu.svg'
import Anivia from '@components/assets/Anivia.svg'
import Annie from '@components/assets/Annie.svg'
import Ashe from '@components/assets/Ashe.svg'
import Ekko from '@components/assets/Ekko.svg'
import Galio from '@components/assets/Galio.svg'
import Sett from '@components/assets/Sett.svg'
import { FC } from 'react'

export const Carousel: FC<{ items?: any[] }> = ({ items }) => {
  return (
    <div className='slider m-auto overflow-hidden relative' aria-label='React Carousel'>
      <div className='slide-track animate-pan flex'>
        <div className='slide'>
          <Galio />
        </div>
        <div className='slide'>
          <Sett />
        </div>
        <div className='slide'>
          <Ashe />
        </div>
        <div className='slide'>
          <Alistar />
        </div>
        <div className='slide'>
          <Amumu />
        </div>
        <div className='slide'>
          <Anivia />
        </div>
        <div className='slide'>
          <Annie />
        </div>
        <div className='slide'>
          <Ekko />
        </div>

        <div className='slide'>
          <Galio />
        </div>
        <div className='slide'>
          <Sett />
        </div>
        <div className='slide'>
          <Ashe />
        </div>
        <div className='slide'>
          <Alistar />
        </div>
        <div className='slide'>
          <Amumu />
        </div>
        <div className='slide'>
          <Anivia />
        </div>
        <div className='slide'>
          <Annie />
        </div>
        <div className='slide'>
          <Ekko />
        </div>
      </div>
    </div>
  )
}
