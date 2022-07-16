import { AssetCard } from '@components/asset-card'
import { Button } from '@components/button'
import { Carousel } from '@components/carousel'
import { useCharactersQuery } from '@graphql/generated/types'
import { KeyboardArrowDown } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { FC } from 'react'

export const Home: FC<ReturnType<typeof useCharactersQuery>> = ({ data, loading, error }) => {
  const router = useRouter()

  return (
    <>
      <div className='flex flex-col justify-between h-[80vh]'>
        <div className='flex flex-col mt-4 md:flex-row md:space-x-20 md:mt-10'>
          <div>
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
          <Carousel
            items={
              data?.characters?.collection?.map((c) => {
                const asset = c?.assets?.find((a) => a?.type === 'model')
                // TODO: fix character type?
                // @ts-ignore

                return <AssetCard key={c?.id} character={c} asset={asset} />
              }) ?? []
            }
          />
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

      <div id='app-overview'>
        <p className='text-primary text-lg mb-4'>Designed for league fanatics</p>
        <p className='text-secondary text-xl mb-4'>
          Easily find your favorite assets and save them for later
        </p>
        <p className='text-tertiary'>
          After being out for over a decade, players still don't have an accessible solution to
          viewing in game assets. We change that today by bringing them to you in our polished model
          explorer.
        </p>
      </div>
    </>
  )
}
