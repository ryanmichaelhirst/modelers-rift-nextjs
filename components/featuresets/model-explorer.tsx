import { ModelChampion } from '@components/model-champion'
import { ModelTabs } from '@components/model-tabs'
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

  const url = model?.uri ? uriToUrl(model.uri) : undefined

  return (
    <div className='flex flex-col md:flex-row h-[80vh]'>
      <div className='h-3/6 w-full md:w-4/6 md:min-h-full overflow-scroll'>
        <ModelTabs data={data} />
      </div>
      {url && (
        <div className='h-3/6 w-full md:w-2/6 md:min-h-full '>
          {url ? <ModelChampion modelUrl={url} /> : <div className=''></div>}
        </div>
      )}
    </div>
  )
}
