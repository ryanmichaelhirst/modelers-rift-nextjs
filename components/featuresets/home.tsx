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
      <div className='mt-10'>
        <div className='flex space-x-20'>
          <div>
            <p className='text-primary text-4xl font-nunito mb-8'>
              Bringing the champions you love to The Web
            </p>
            <p className='text-tertiary text-2xl font-nunito mb-8'>
              Explore every champion, skin, voice line, sound effect, and animation in League of
              Legends. Perfect for viewing new releases and store content.
            </p>
            <Button
              classes={{
                root: 'font-nunito bg-primary py-3 px-7 text-white',
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
      </div>
      <div className='flex flex-col items-center justify-center font-nunito'>
        <p className='text-primary text-4xl mb-4'>Not enough?</p>
        <p className='text-tertiary text-xl font-nunito mb-4'>
          Take a look at what else we have to offer
        </p>
        <KeyboardArrowDown className='text-primary text-4xl' />
      </div>
    </>
  )
}
