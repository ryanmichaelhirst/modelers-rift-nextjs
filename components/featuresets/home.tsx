import { AssetCard } from '@components/asset-card'
import { Button } from '@components/button'
import { useCharactersQuery } from '@graphql/generated/types'
import { useRouter } from 'next/router'

export const Home = () => {
  const router = useRouter()
  const { data } = useCharactersQuery({
    variables: {
      page: 1,
      pageSize: 5,
      includeAssets: true,
    },
  })

  return (
    <div className='mt-10'>
      <div className='flex space-x-20'>
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
        <div className='flex space-x-5'>
          {data?.characters?.collection?.map((c) => {
            const asset = c?.assets?.find((a) => a?.type === 'model')
            // TODO: fix character type?
            // @ts-ignore

            return <AssetCard key={c?.id} character={c} asset={asset} />
          })}
        </div>
      </div>
    </div>
  )
}
