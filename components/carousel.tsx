import Ahri from '@components/assets/Ahri.svg'
import Akali from '@components/assets/Akali.svg'
import Akshan from '@components/assets/Akshan.svg'
import Alistar from '@components/assets/Alistar.svg'
import Amumu from '@components/assets/Amumu.svg'
import Anivia from '@components/assets/Anivia.svg'
import Annie from '@components/assets/Annie.svg'
import Aphelios from '@components/assets/Aphelios.svg'

import { FC } from 'react'

export const Carousel: FC<{ items?: any[] }> = ({ items }) => {
  return (
    <div className='slider m-auto overflow-hidden relative' aria-label='React Carousel'>
      <div className='slide-track animate-pan flex'>
        <div className='slide'>
          <Ahri />
        </div>
        <div className='slide'>
          <Akali />
        </div>
        <div className='slide'>
          <Akshan />
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
          <Aphelios />
        </div>

        <div className='slide'>
          <Ahri />
        </div>
        <div className='slide'>
          <Akali />
        </div>
        <div className='slide'>
          <Akshan />
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
          <Aphelios />
        </div>
      </div>
    </div>
  )
}
