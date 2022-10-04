import Aatrox from '@/assets/Aatrox.png'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Carousel } from '@/components/carousel'
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

export default () => {
  const router = useRouter()

  const onExplore = () => router.push('models')

  return (
    <>
      <div className='flex h-full flex-col justify-between'>
        <div className='mt-4 flex flex-col md:mt-10 md:flex-row md:space-x-20'>
          <div className='w-full md:w-3/5'>
            <p className='mb-2 text-xl text-primary md:mb-8 md:text-4xl'>
              Bringing the champions you love to the web
            </p>
            <p className='mb-2 text-lg text-tertiary md:mb-8 md:text-2xl'>
              Explore every champion, skin, voice line, sound effect, and animation in League of
              Legends. Perfect for viewing new releases and store content.
            </p>
            <Button text='Show me models' onClick={() => router.push('models')} />
          </div>
          <div className='mt-10 w-[300px] self-center text-center md:mt-0 md:w-2/5 md:text-left'>
            <Card>
              <p className='font-nunito text-lg font-bold capitalize text-tertiary'>Aatrox</p>
              <p>The Darkin Blade</p>
              <div className='flex justify-center'>
                <Image src={Aatrox} width='150px' height='297px' />
              </div>
              <div className='mt-2 flex items-center'>
                <Button
                  text='Explore'
                  onClick={onExplore}
                  classes={{ button: '!text-primary !bg-transparent hover:!opacity-80' }}
                  icon={<ExternalLinkIcon className='h-4 w-4 text-primary' />}
                />
              </div>
            </Card>
          </div>
        </div>
        <div className='mb-4 mt-10 flex flex-col items-center justify-center md:mt-0'>
          <p className='text-xl text-primary md:mb-4 md:text-4xl'>Not enough?</p>
          <p className='text-lg text-tertiary md:mb-4 md:text-xl'>
            Take a look at what else we have to offer
          </p>
          <ChevronDownIcon
            className='h-10 w-10 cursor-pointer text-primary'
            onClick={() =>
              window.document.getElementById('app-overview')?.scrollIntoView({ behavior: 'smooth' })
            }
          />
        </div>
      </div>

      <div className='flex flex-col items-center justify-center md:flex-row'>
        <div id='app-overview' className='mb-32 w-1/2 pt-32 md:mr-[150px]'>
          <p className='mb-4 text-lg font-bold text-primary'>Designed for league fanatics</p>
          <p className='mb-4 text-xl font-bold text-secondary'>
            Easily find your favorite assets and save them for later
          </p>
          <p className='text-tertiary'>
            After being out for over a decade, players still don't have an accessible solution to
            viewing in game assets. We change that today by bringing them to you in our polished
            model explorer.
          </p>
        </div>

        <div className='relative mb-32 flex h-[240px] w-full items-center justify-center md:mb-0 md:w-1/2'>
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

      <div className='-mx-4 mb-32 bg-[#EFEFEF] px-4 pt-10 pb-10 md:-mx-16 md:px-20'>
        <p className='mb-4 text-lg font-bold text-primary'>Why Modeler's Rift</p>
        <p className='mb-4 text-xl font-bold text-secondary'>The only 3D Viewer you'll ever need</p>
        <div className='flex justify-between'>
          <div className='w-[230px]'>
            <div className='flex'>
              <CollectionIcon className='mr-2 h-5 w-5 text-secondary' />
              <p className='mb-2 text-secondary'>Slammin Skins</p>
            </div>
            <p className='text-sm'>View your favorite skin for any champion. We have them all</p>
          </div>

          <div className='w-[230px]'>
            <div className='flex'>
              <VolumeUpIcon className='mr-2 h-5 w-5 text-secondary' />
              <p className='mb-2 text-secondary'>Valorant Voices</p>
            </div>

            <p className='text-sm'>
              Use our sound player to listen to audios. You know you want to.
            </p>
          </div>

          <div className='w-[230px]'>
            <div className='flex'>
              <DocumentDownloadIcon className='mr-2 h-5 w-5 text-secondary' />
              <p className='mb-2 text-secondary'>Devious Downloads</p>
            </div>

            <p className='text-sm'>Download your favorite assets for personal use. Coming soon!</p>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center pb-20 text-xl'>
        <p className='mr-3'>Questions or feedback? Share it with us!</p>
        <ArrowCircleRightIcon className='h-5 w-5' />
      </div>
    </>
  )
}
