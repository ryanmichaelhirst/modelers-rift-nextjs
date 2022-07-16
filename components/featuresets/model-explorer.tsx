import { ModelChampion } from '@components/model-champion'
import { ModelTabs } from '@components/model-tabs'
import { useAppContext } from '@context/index'
import { useCharacterQuery } from '@graphql/generated/types'
import { LinearProgress } from '@mui/material'
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
    <div className='flex h-full'>
      <div className='w-1/3 max-h-full overflow-scroll'>
        <ModelTabs data={data} />
      </div>
      {!url && (
        <div className='flex-1 items-center justify-center'>
          <div className='m-auto'>
            <LinearProgress />
          </div>
        </div>
      )}
      {url && (
        <div className='flex-auto'>
          {url ? <ModelChampion modelUrl={url} /> : <div className=''></div>}
        </div>
      )}
    </div>
  )
}
