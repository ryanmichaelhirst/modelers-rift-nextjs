import { awsS3Service } from '@/bin/services/aws-s3-service'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Carousel } from '@/components/carousel'
import { awsLogger } from '@/lib/datadog'
import { defaultModelHref } from '@/pages/model/[name]'
import {
  ArrowCircleRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CollectionIcon,
  EmojiHappyIcon,
  ExternalLinkIcon,
  IdentificationIcon,
  LightningBoltIcon,
  SearchIcon,
  VolumeUpIcon,
} from '@heroicons/react/outline'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SVGProps } from 'react'

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
    <Card className='bg-corner-gradient w-1/3 md:w-[200px] rounded-lg border border-primary md:border-none shadow-md'>
      <p className='font-nunito text-lg font-bold capitalize text-tertiary' title={name}>
        {name}
      </p>
      <p className='truncate hidden md:block' title={title}>
        {title}
      </p>
      <Image src={src} height={150} width={200} alt={title} />
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

const FEATURE_CARDS = [
  {
    title: 'Devious Downloads',
    subtitle: 'Save .glb files straight to your computer',
    icon: CollectionIcon,
  },
  {
    title: 'Valorant Voices',
    subtitle: 'Use our sound player to listen to audios. You know you want to.',
    icon: VolumeUpIcon,
  },
  {
    title: 'Slammin Skins',
    subtitle: 'View 1000+ skins and animations',
    icon: LightningBoltIcon,
  },
]

const FeatureCard = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  subtitle: string
}) => (
  <div className='flex md:w-[230px] flex-col rounded bg-white py-4 px-6 text-center shadow'>
    <div className='flex flex-col items-center'>
      <Icon className='mr-2 h-5 w-5 text-black' />
      <p className='mt-1 mb-2 text-black'>{title}</p>
    </div>
    <p className='text-sm text-[#08090A]'>{subtitle}</p>
  </div>
)

const LINK_BLOCKS = [
  {
    title: 'Register',
    description: 'Create an account and download files',
    icon: IdentificationIcon,
    buttonText: 'Sign up',
    href: '/sign-up',
  },
  {
    title: 'Search models',
    description: 'Pick a champion and cycle through their skins',
    icon: SearchIcon,
    buttonText: 'Find a model',
    href: defaultModelHref,
  },
  {
    title: 'Support us',
    description: 'Make a donation or consider becoming a patron',
    icon: EmojiHappyIcon,
    buttonText: 'Donate now',
    href: '/support-us',
  },
]

const LinkBlock = ({ icon: Icon, title, description, buttonText, href }: any) => {
  const router = useRouter()

  return (
    <div className='flex flex-col mb-10 md:mb-0'>
      <Icon className='mb-1 h-5 w-5 text-black' />
      <p className='mb-2 font-bold'>{title}</p>
      <p className='mb-2 flex-grow'>{description}</p>
      <Button
        type='text'
        text={buttonText}
        onClick={() => router.push(href)}
        icon={<ChevronRightIcon className='h-4 w-4 text-primary' />}
        iconPosition='end'
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  resolvedUrl,
  params,
  query,
}) => {
  // cache homepage for 1 year
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')

  awsLogger.info('server side rendering the home page', {
    metadata: { resolvedUrl, params, query, cookies: req.cookies, headers: req.headers },
  })

  const modelImgsResp = await awsS3Service.listObjects({
    prefix: 'images/models',
  })
  const modelImgsContents = modelImgsResp.Contents?.filter((c) => c?.Size && c.Size > 0) ?? []
  const carouselImages = await Promise.all(
    modelImgsContents.map(async (c) => {
      if (!c.Key) return undefined

      // cache images for 1 week
      return await awsS3Service.getSignedUrl({ key: c.Key, expiresIn: 604800 })
    }),
  )

  const cardImgsResp = await awsS3Service.listObjects({
    prefix: 'images/cards',
  })
  const cardImgsContents = cardImgsResp.Contents?.filter((c) => c?.Size && c.Size > 0) ?? []
  const cardImages = await Promise.all(
    cardImgsContents.map(async (c) => {
      if (!c.Key) return undefined

      // cache images for 1 week
      return await awsS3Service.getSignedUrl({ key: c.Key, expiresIn: 604800 })
    }),
  )

  return {
    props: {
      carouselImages: carouselImages.filter((i) => i !== undefined),
      cardImages,
    },
  }
}

export default ({
  carouselImages,
  cardImages,
}: {
  carouselImages?: string[]
  cardImages?: string[]
}) => {
  const router = useRouter()

  const onExplore = (characterName: string) => () =>
    router.push(`model/${characterName.toLowerCase()}`)

  const exploreCards = [
    {
      name: 'Galio',
      title: 'The Colossus',
      src: cardImages?.find((img) => img.toLowerCase().includes('galio')),
    },
    {
      name: 'Gwen',
      title: 'The Hallowed Seamstress',
      src: cardImages?.find((img) => img.toLowerCase().includes('gwen')),
    },
    {
      name: 'Yone',
      title: 'The Unforgotten',
      src: cardImages?.find((img) => img.toLowerCase().includes('yone')),
    },
  ]

  return (
    <>
      <div className='h-[85vh] flex flex-col justify-between'>
        <div className='mt-4 flex flex-col md:flex-row md:space-x-20'>
          <div className='md:w-3/5'>
            <p className='h1 mb-5 text-primary'>Bringing the champions you love to the web</p>
            <p className='h2 mb-2 text-tertiary md:mb-8'>
              Explore every champion, skin, voice line, sound effect, and animation in League of
              Legends. Perfect for viewing new releases and store content.
            </p>
            <Button text='Show me models' onClick={() => router.push(defaultModelHref)} />
          </div>
          <div className='mt-10 overflow-x-hidden text-center md:relative md:mt-0 md:!-mr-16 md:h-[330px] md:w-2/5 md:text-left'>
            <div className='flex space-x-4 md:absolute'>
              {exploreCards.map((ec) => (
                <ExploreCard key={ec.name} onExplore={onExplore} {...ec} />
              ))}
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

      <div className='flex flex-col items-center justify-center md:flex-row'>
        <div id='app-overview' className='md:mb-32 mb-4 md:w-1/2 pt-32 md:mr-[150px]'>
          <p className='h4 font-bold text-primary'>Designed for league fanatics</p>
          <p className='h3 mb-4 font-bold text-secondary'>
            Easily view your favorite models in seconds
          </p>
          <p className='text-tertiary'>
            After being out for over a decade, players still don’t have an accessible solution to
            viewing in game assets. We change that today.
          </p>
        </div>

        <div className='relative mb-32 flex h-[300px] w-full items-center justify-center md:mb-0 md:w-1/2'>
          <Image
            fill
            sizes='(max-width: 768px) 50%,
            (max-width: 1200px) 50%,
            50%'
            src={'/explorer-screenshot.png'}
            className='rounded'
            alt={'Model explorer screenshot'}
          />
        </div>
      </div>

      <div className='mb-32'>
        <Carousel items={carouselImages} />
      </div>

      <div className='-mx-4 mb-32 bg-[#EFEFEF] pt-10 pb-10 md:-mx-40'>
        <div className='flex flex-col items-stretch mx-4 md:mx-40'>
          <p className='h4 font-bold text-primary'>Why Modeler's Rift</p>
          <p className='h3 mb-6 font-bold text-secondary'>
            Full support for animations, audio, and more
          </p>
          <div className='flex flex-col justify-between md:flex-row'>
            {FEATURE_CARDS.map((fc) => (
              <FeatureCard key={fc.title} {...fc} />
            ))}
          </div>
        </div>
      </div>

      <div className='mt-40 flex flex-col md:flex-row'>
        <div className='mr-12 md:w-[370px] md:min-w-[370px]'>
          <p className='h3 mb-4 font-bold text-primary'>Ready to get started?</p>
          <p className='h4 mb-6 text-secondary'>
            Check out your favorite champion in our{' '}
            <Link className='text-primary' href={defaultModelHref}>
              Model Explorer
            </Link>
            , or create an account and start downloading models.
          </p>
          <Button
            text='Get started'
            onClick={() => router.push('sign-up')}
            classes={{ button: 'rounded-full' }}
            icon={<ChevronRightIcon className='h-4 w-4 text-white' />}
            iconPosition='end'
          />
        </div>
        <div className='flex flex-col space-x-0 md:flex-row mt-10 md:mt-0 md:space-x-6'>
          {LINK_BLOCKS.map((lb) => (
            <LinkBlock key={lb.title} {...lb} />
          ))}
        </div>
      </div>
      <div className='mt-72 flex items-center justify-center pb-20 text-xl'>
        <p className='h3 mr-3'>Questions or feedback? Share it with us!</p>
        <ArrowCircleRightIcon className='h-5 w-5' />
      </div>
    </>
  )
}
