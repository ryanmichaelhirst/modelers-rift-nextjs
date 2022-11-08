import GalioCard from '@/assets/Galio-card.png'
import YoneCard from '@/assets/Yone-card.png'
import GwenCard from '@/assets/Gwen-card.png'
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

const ExploreCard = ({
  onExplore,
  name,
  title,
  src,
}: {
  onExplore: (characterName: string) => () => void
  name: string
  title: string
  src: any
}) => {
  return (
    <Card className='bg-corner-gradient h-[317px] w-[200px] rounded-lg border-none'>
      <p className='font-nunito text-lg font-bold capitalize text-tertiary'>{name}</p>
      <p>{title}</p>
      <div className='flex justify-center'>
        <Image src={src} objectFit='fill' />
      </div>
      <div className='mt-2 flex items-center'>
        <Button
          text='Explore'
          onClick={onExplore(name)}
          classes={{ button: '!text-primary !bg-transparent hover:!opacity-80 p-0' }}
          icon={<ExternalLinkIcon className='h-4 w-4 text-primary' />}
          iconPosition='end'
        />
      </div>
    </Card>
  )
}

const EXPLORE_CARDS = [
  {
    name: 'Galio',
    title: 'The Colossus',
    src: GalioCard,
  },
  {
    name: 'Yone',
    title: 'The Unforgotten',
    src: YoneCard,
  },
  {
    name: 'Gwen',
    title: 'The Hallowed Seamstress',
    src: GwenCard,
  },
]

export default () => {
  const router = useRouter()

  const onExplore = (characterName: string) => () =>
    router.push(`model/${characterName.toLowerCase()}`)

  return (
    <>
      <div className='flex h-full flex-col justify-between'>
        <div className='mt-4 flex flex-col md:mt-10 md:flex-row md:space-x-20'>
          <div className='ml-4 md:ml-16 md:w-3/5'>
            <p className='h1 mb-2 text-primary md:mb-8'>
              Bringing the champions you love to the web
            </p>
            <p className='h2 mb-2 text-tertiary md:mb-8'>
              Explore every champion, skin, voice line, sound effect, and animation in League of
              Legends. Perfect for viewing new releases and store content.
            </p>
            <Button text='Show me models' onClick={() => router.push('models')} />
          </div>
          <div className='overflow-x-hidden md:w-2/5'>
            <div className='mt-10 text-center md:relative md:mt-0 md:text-left'>
              <div className='flex space-x-4 md:absolute'>
                {EXPLORE_CARDS.map((ec) => (
                  <ExploreCard key={ec.name} onExplore={onExplore} {...ec} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='mb-4 mt-10 flex flex-col items-center justify-center md:mt-0'>
          <p className='h4 text-primary md:mb-4'>Interested?</p>
          <p className='h3 text-tertiary md:mb-4'>Take a look at what else we have to offer</p>
          <ChevronDownIcon
            className='h-10 w-10 cursor-pointer text-primary'
            onClick={() =>
              window.document.getElementById('app-overview')?.scrollIntoView({ behavior: 'smooth' })
            }
          />
        </div>
      </div>

      <div className='mx-4 flex flex-col items-center justify-center md:mx-16 md:flex-row'>
        <div id='app-overview' className='mb-32 w-1/2 pt-32 md:mr-[150px]'>
          <p className='h4 mb-4 font-bold text-primary'>Designed for league fanatics</p>
          <p className='h3 mb-4 font-bold text-secondary'>
            Easily view your favorite models in seconds
          </p>
          <p className='text-tertiary'>
            After being out for over a decade, players still don’t have an accessible solution to
            viewing in game assets. We change that today.
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
        <p className='h4 mb-4 font-bold text-primary'>Why Modeler's Rift</p>
        <p className='h3 mb-4 font-bold text-secondary'>The only 3D Viewer you'll ever need</p>
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
        <p className='h3 mr-3'>Questions or feedback? Share it with us!</p>
        <ArrowCircleRightIcon className='h-5 w-5' />
      </div>
    </>
  )
}
