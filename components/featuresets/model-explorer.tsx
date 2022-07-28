import { AssetPlayer } from '@components/asset-player'
import { Input } from '@components/input'
import { ModelChampion } from '@components/model-champion'
import { ModelTabs } from '@components/model-tabs'
import { useAppContext } from '@context/index'
import { AssetType } from '@customtypes/constants'
import { useCharacterQuery } from '@graphql/generated/types'
import { Box } from '@mui/material'
import { capitalize, getSplashArtLink, uriToUrl } from '@utils/index'
import Image from 'next/image'
import { useState } from 'react'

export const ModelExplorer = () => {
  const [{ selectedChampion }, dispatch] = useAppContext()
  const [selected, setSelected] = useState()

  const { data, loading, error } = useCharacterQuery({
    variables: {
      filter: {
        nameEq: selectedChampion.basicInfo?.name?.toLowerCase(),
      },
      includeAssets: true,
    },
  })

  const championName = capitalize(selectedChampion.basicInfo?.name)

  const models = data?.character?.assets?.filter((a) => a?.type === 'model') ?? []
  const model = models.find((m) => m?.skin === selectedChampion.skin)

  const url = model?.uri ? uriToUrl(model.uri) : undefined
  const assets = data?.character?.assets?.filter((a) => {
    return [AssetType.SFX, AssetType.VO].includes(a?.type as AssetType)
  })

  const onSearch = () => {}

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
            <Input
              onChange={onSearch}
              value={selected}
              classes='mb-4'
              options={models.map((m) => ({
                label: m?.name,
                value: m?.skin,
              }))}
              renderOption={(props, option) => (
                <Box component='li' {...props}>
                  <Image
                    height='20'
                    width='20'
                    src={
                      option.label.includes('Chroma')
                        ? '/no-image.jpg'
                        : getSplashArtLink(championName, option.value.replace('skin', ''))
                    }
                    className='rounded'
                    alt={option}
                  />
                  <p className='ml-2'>{option.label}</p>
                </Box>
              )}
              isOptionEqualToValue={(option, value) => {
                if (option.label === value) return true

                return false
              }}
              label='Search champions...'
              muiClasses={{
                autoComp: {
                  root: 'bg-white/30 border-none py-2',
                },
                textField: {
                  root: 'text-primary text-lg',
                  notchedOutline: 'border-none',
                },
                label: {
                  root: 'text-primary text-lg',
                  focused: '!text-primary',
                },
              }}
            />
          </div>
          {url ? <ModelChampion modelUrl={url} /> : <div className=''></div>}
        </div>
      )}
    </div>
  )
}
