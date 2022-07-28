import { AssetCard } from '@components/asset-card'
import { Button } from '@components/button'
import { Carousel } from '@components/carousel'
import { CharactersQueryHookResult } from '@graphql/generated/types'
import {
  ArrowCircleRightOutlined,
  FileDownloadOutlined,
  GraphicEqOutlined,
  KeyboardArrowDown,
  LocalFireDepartmentOutlined,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { FC } from 'react'

export const Home: FC<CharactersQueryHookResult> = ({ data, loading, error }) => {
  const router = useRouter()

  return (
    <>
      <div className='flex flex-col justify-between h-[80vh]'>
        <div className='flex flex-col mt-4 md:flex-row md:space-x-20 md:mt-10'>
          <div className='w-2/3'>
            <p className='text-primary text-xl mb-2 md:text-4xl md:mb-8'>
              Bringing the champions you love to the web
            </p>
            <p className='text-tertiary text-lg mb-2 md:text-2xl md:mb-8'>
              Explore every champion, skin, voice line, sound effect, and animation in League of
              Legends. Perfect for viewing new releases and store content.
            </p>
            <Button
              classes={{
                root: 'text-white bg-primary py-2 px-3 md:py-3 md:px-7',
              }}
              text='Show me models'
              onClick={() => router.push('models')}
            />
          </div>
          <div className='w-1/3'>
            {data?.characters?.collection?.slice(0, 1).map((c) => {
              const asset = c?.assets?.find((a) => a?.type === 'model')
              // TODO: fix character type?
              // @ts-ignore

              return <AssetCard key={c?.id} character={c} asset={asset} />
            }) ?? []}
          </div>
        </div>
        <div className='flex flex-col items-center justify-center mb-4'>
          <p className='text-primary text-xl md:text-4xl md:mb-4'>Not enough?</p>
          <p className='text-tertiary text-lg md:text-xl md:mb-4'>
            Take a look at what else we have to offer
          </p>
          <KeyboardArrowDown
            className='text-primary text-4xl cursor-pointer'
            onClick={() =>
              window.document.getElementById('app-overview')?.scrollIntoView({ behavior: 'smooth' })
            }
          />
        </div>
      </div>

      <div id='app-overview' className='w-1/2 mb-32'>
        <p className='text-primary text-lg mb-4 font-bold'>Designed for league fanatics</p>
        <p className='text-secondary text-xl font-bold mb-4'>
          Easily find your favorite assets and save them for later
        </p>
        <p className='text-tertiary'>
          After being out for over a decade, players still don't have an accessible solution to
          viewing in game assets. We change that today by bringing them to you in our polished model
          explorer.
        </p>
      </div>

      <div className='mb-32'>
        <Carousel />
      </div>

      <div className='-mx-4 md:-mx-20 mb-32 px-4 md:px-20 pt-10 pb-10 bg-[#EFEFEF]'>
        <p className='text-primary text-lg mb-4 font-bold'>Why Modeler's Rift</p>
        <p className='text-secondary text-xl font-bold mb-4'>The only 3D Viewer you'll ever need</p>
        <div className='flex justify-between'>
          <div className='w-[230px]'>
            <div className='flex'>
              <LocalFireDepartmentOutlined className='text-secondary mr-2' />
              <p className='text-secondary mb-2'>Slammin Skins</p>
            </div>
            <p className='text-sm'>View your favorite skin for any champion. We have them all</p>
          </div>

          <div className='w-[230px]'>
            <div className='flex'>
              <GraphicEqOutlined className='text-secondary mr-2' />
              <p className='text-secondary mb-2'>Valorant Voices</p>
            </div>

            <p className='text-sm'>
              Use our sound player to listen to audios. You know you want to.
            </p>
          </div>

          <div className='w-[230px]'>
            <div className='flex'>
              <FileDownloadOutlined className='text-secondary mr-2' />
              <p className='text-secondary mb-2'>Devious Downloads</p>
            </div>

            <p className='text-sm'>Download your favorite assets for personal use. Coming soon!</p>
          </div>
        </div>
      </div>

      <div className='flex justify-center items-center text-xl pb-20'>
        <p className='mr-3'>Questions or feedback? Share it with us!</p>
        <ArrowCircleRightOutlined />
      </div>
    </>
  )
}
