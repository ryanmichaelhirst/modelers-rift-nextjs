import Alistar from '@assets/Alistar.png'
import Amumu from '@assets/Amumu.png'
import Anivia from '@assets/Anivia.png'
import Annie from '@assets/Annie.png'
import Ashe from '@assets/Ashe.png'
import Ekko from '@assets/Ekko.png'
import Galio from '@assets/Galio.png'
import Sett from '@assets/Sett.png'
import Image from 'next/image'
import { FC } from 'react'

export const Carousel: FC<{ items?: any[] }> = ({ items }) => {
  return (
    <div className='slider m-auto overflow-hidden relative' aria-label='React Carousel'>
      <div className='slide-track animate-pan flex'>
        <div className='slide'>
          <Image src={Alistar} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Sett} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Ashe} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Alistar} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Amumu} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Anivia} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Annie} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Ekko} width='150px' height='170px' />
        </div>

        <div className='slide'>
          <Image src={Galio} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Sett} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Ashe} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Alistar} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Amumu} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Anivia} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Annie} width='150px' height='170px' />
        </div>
        <div className='slide'>
          <Image src={Ekko} width='150px' height='170px' />
        </div>
      </div>
    </div>
  )
}
