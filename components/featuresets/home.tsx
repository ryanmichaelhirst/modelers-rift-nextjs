import { AssetCard } from '@components/asset-card'
import { Button } from '@components/button'
import { useAssetsQuery } from '@graphql/generated/types'

export const Home = () => {
  const { data } = useAssetsQuery({
    variables: {
      page: 1,
      pageSize: 5,
      filter: {
        typeEq: 'model',
        skinEq: 'skin0',
      },
    },
  })

  console.log(data?.assets?.collection)

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
          />
        </div>
        <div className='flex space-x-5'>
          {data?.assets?.collection?.map((a) => (
            <AssetCard key={a?.id} asset={a} url={a?.url} />
          ))}
        </div>
      </div>
    </div>
  )
}
