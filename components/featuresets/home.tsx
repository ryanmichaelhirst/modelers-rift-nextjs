import Aatrox from '@assets/Aatrox.png'
import { Button } from '@components/button'
import { Card } from '@components/card'
import { Carousel } from '@components/carousel'
import { useAppContext } from '@context/index'
import { FETCH_NEW_CHAMPION } from '@customtypes/index'
import { CharactersQueryHookResult } from '@graphql/generated/types'
import {
  ArrowCircleRightIcon,
  ChevronDownIcon,
  CollectionIcon,
  DocumentDownloadIcon,
  ExternalLinkIcon,
  VolumeUpIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

export const Home: FC<CharactersQueryHookResult> = ({ data, loading, error }) => {
  const router = useRouter()
  const [, dispatch] = useAppContext()

  const onExplore = () => {
    dispatch({ type: FETCH_NEW_CHAMPION, payload: 'Aatrox' })
    router.push('models')
  }

  return (
    <>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col mt-4 md:flex-row md:space-x-20 md:mt-10'>
          <div className='w-full md:w-3/5'>
            <p className='text-primary text-xl mb-2 md:text-4xl md:mb-8'>
              Bringing the champions you love to the web
            </p>
            <p className='text-tertiary text-lg mb-2 md:text-2xl md:mb-8'>
              Explore every champion, skin, voice line, sound effect, and animation in League of
              Legends. Perfect for viewing new releases and store content.
            </p>
            <Button text='Show me models' onClick={() => router.push('models')} />
          </div>
          <div className='mt-10 w-[300px] text-center self-center md:text-left md:mt-0 md:w-2/5'>
            <Card>
              <p className='text-tertiary font-nunito font-bold text-lg capitalize'>Aatrox</p>
              <p>The Darkin Blade</p>
              <div className='flex justify-center'>
                <Image src={Aatrox} width='150px' height='297px' />
              </div>
              <div className='flex items-center mt-2'>
                <Button
                  text='Explore'
                  onClick={onExplore}
                  classes={{ button: '!text-primary !bg-transparent hover:!opacity-80' }}
                  icon={<ExternalLinkIcon className='text-primary h-4 w-4' />}
                />
              </div>
            </Card>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center mb-4 mt-10 md:mt-0'>
          <p className='text-primary text-xl md:text-4xl md:mb-4'>Not enough?</p>
          <p className='text-tertiary text-lg md:text-xl md:mb-4'>
            Take a look at what else we have to offer
          </p>
          <ChevronDownIcon
            className='text-primary h-10 w-10 cursor-pointer'
            onClick={() =>
              window.document.getElementById('app-overview')?.scrollIntoView({ behavior: 'smooth' })
            }
          />
        </div>
      </div>

      <div className='flex flex-col items-center justify-center md:flex-row'>
        <div id='app-overview' className='w-1/2 pt-32 mb-32 md:mr-[150px]'>
          <p className='text-primary text-lg mb-4 font-bold'>Designed for league fanatics</p>
          <p className='text-secondary text-xl font-bold mb-4'>
            Easily find your favorite assets and save them for later
          </p>
          <p className='text-tertiary'>
            After being out for over a decade, players still don't have an accessible solution to
            viewing in game assets. We change that today by bringing them to you in our polished
            model explorer.
          </p>
        </div>

        <div className='flex items-center justify-center relative w-full mb-32 h-[240px] md:mb-0 md:w-1/2'>
          <Image
            layout='fill'
            objectFit='cover'
            src={'/explorer-screenshot.png'}
            className='rounded'
            alt={'model explorer table'}
          />
        </div>
      </div>

      <div className='mb-32'>
        <Carousel />
      </div>

      <div className='-mx-4 md:-mx-16 mb-32 px-4 md:px-20 pt-10 pb-10 bg-[#EFEFEF]'>
        <p className='text-primary text-lg mb-4 font-bold'>Why Modeler's Rift</p>
        <p className='text-secondary text-xl font-bold mb-4'>The only 3D Viewer you'll ever need</p>
        <div className='flex justify-between'>
          <div className='w-[230px]'>
            <div className='flex'>
              <CollectionIcon className='text-secondary mr-2 h-5 w-5' />
              <p className='text-secondary mb-2'>Slammin Skins</p>
            </div>
            <p className='text-sm'>View your favorite skin for any champion. We have them all</p>
          </div>

          <div className='w-[230px]'>
            <div className='flex'>
              <VolumeUpIcon className='text-secondary mr-2 h-5 w-5' />
              <p className='text-secondary mb-2'>Valorant Voices</p>
            </div>

            <p className='text-sm'>
              Use our sound player to listen to audios. You know you want to.
            </p>
          </div>

          <div className='w-[230px]'>
            <div className='flex'>
              <DocumentDownloadIcon className='text-secondary mr-2 h-5 w-5' />
              <p className='text-secondary mb-2'>Devious Downloads</p>
            </div>

            <p className='text-sm'>Download your favorite assets for personal use. Coming soon!</p>
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center text-xl pb-20'>
        <p className='mr-3'>Questions or feedback? Share it with us!</p>
        <ArrowCircleRightIcon className='h-5 w-5' />
      </div>
    </>
  )
}
