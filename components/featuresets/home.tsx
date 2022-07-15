import { AssetCard } from '@components/asset-card'
import { Button } from '@components/button'
import { Carousel } from '@components/carousel'
import { useCharactersQuery } from '@graphql/generated/types'
import { LinearProgress } from '@mui/material'
import { useRouter } from 'next/router'

export const Home = () => {
  const router = useRouter()
  const { data, loading, error } = useCharactersQuery({
    variables: {
      page: 1,
      pageSize: 7,
      includeAssets: true,
      filter: {
        typeEq: 'champion',
      },
    },
  })

  return (
    <div className='mt-10'>
      <div className='flex-col space-x-20'>
        <div className='w-[600px]'>
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
        {loading && (
          <div className='grow'>
            <LinearProgress />
          </div>
        )}
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
  )
}
