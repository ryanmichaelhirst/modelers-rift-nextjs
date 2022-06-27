import InteractiveCard from '@components/interactive-card'
import { ModelChampion } from '@components/model-champion'
import { useAppContext } from '@context/index'
import { useCharacterQuery } from '@graphql/generated/types'
import { uriToUrl } from '@utils/index'

export const ModelExplorer = () => {
  const [{ selectedChampion }] = useAppContext()
  const { data, loading: characterLoading, error } = useCharacterQuery({
    variables: {
      filter: {
        nameEq: selectedChampion.basicInfo?.name?.toLowerCase(),
      },
      includeAssets: true,
    },
  })

  const model = data?.character?.assets
    ?.filter((a) => a?.type === 'model')
    .find((m) => m?.skin === selectedChampion.skin)

  return (
    <div className='flex h-full'>
      <div className='w-1/3'>
        <InteractiveCard selectedChampion={selectedChampion} data={data} model={model} />
      </div>
      <div className='flex-auto'>
        <ModelChampion modelUrl={uriToUrl(model?.url)} />
      </div>
    </div>
  )
}
