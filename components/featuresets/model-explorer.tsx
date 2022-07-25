import { AssetPlayer } from '@components/asset-player'
import { ImageSlider } from '@components/image-slider'
import { ModelChampion } from '@components/model-champion'
import { ModelTabs } from '@components/model-tabs'
import { useAppContext } from '@context/index'
import { AssetType } from '@customtypes/constants'
import { SET_SELECTED_SKIN } from '@customtypes/index'
import { useCharacterQuery } from '@graphql/generated/types'
import { AddPhotoAlternate } from '@mui/icons-material'
import { capitalizeWord, getSplashArtLink, uriToUrl } from '@utils/index'
import classNames from 'classnames'

export const ModelExplorer = () => {
  const [{ selectedChampion }, dispatch] = useAppContext()
  const { data, loading, error } = useCharacterQuery({
    variables: {
      filter: {
        nameEq: selectedChampion.basicInfo?.name?.toLowerCase(),
      },
      includeAssets: true,
    },
  })

  const onClick = (skin?: string | null) => () => {
    if (!skin) return

    console.log(skin)

    dispatch({ type: SET_SELECTED_SKIN, payload: skin })
  }

  const lolSkins = selectedChampion.detailedInfo?.skins ?? []
  const models = data?.character?.assets?.filter((a) => a?.type === 'model') ?? []
  const model = models.find((m) => m?.skin === selectedChampion.skin)
  const chromas = models
    .filter((m) => !lolSkins.find((s) => `skin${s.num}` === m?.skin))
    .map((m) => (
      <div
        title={`Add image suggestion`}
        key={m?.id}
        className='cursor-pointer w-full h-[32px] flex items-center justify-center mr-2'
        onClick={onClick(m?.skin)}
      >
        <AddPhotoAlternate className='h-full w-1/2 text-slate-400' />
      </div>
    ))

  const slides =
    lolSkins
      .map((skin) => {
        const championName = capitalizeWord(selectedChampion.basicInfo?.name)

        return (
          <div
            key={skin.id}
            title={skin?.name}
            className={classNames(
              'cursor-pointer w-full h-[32px] bg-cover rounded-lg mr-2 opacity-30',
              {
                '!opacity-100': selectedChampion.skin === `skin${skin?.num}`,
              },
            )}
            style={{
              backgroundImage: `url(${getSplashArtLink(championName, skin.num || 0)})`,
            }}
            onClick={onClick(`skin${skin?.num}`)}
          />
        )
      })
      .concat(chromas) ?? []

  const url = model?.uri ? uriToUrl(model.uri) : undefined
  const assets = data?.character?.assets?.filter((a) => {
    return [AssetType.SFX, AssetType.VO].includes(a?.type as AssetType)
  })

  return (
    <div className='flex flex-col md:flex-row h-[80vh]'>
      <div className='h-3/6 w-full md:w-4/6 md:min-h-full overflow-scroll'>
        <ModelTabs data={data} />
        <AssetPlayer assets={assets} className='mt-5 border' />
      </div>
      {url && (
        <div className='h-3/6 w-full md:w-2/6 md:min-h-full'>
          <div className='px-6 flex justify-between'>
            <span>{selectedChampion.basicInfo?.name}</span>
            <span>{model?.name}</span>
          </div>
          <div className='px-6'>
            <ImageSlider slides={slides} />
          </div>
          {url ? <ModelChampion modelUrl={url} /> : <div className=''></div>}
        </div>
      )}
    </div>
  )
}
