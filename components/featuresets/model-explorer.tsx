import { Input } from '@components/input'
import { Loader } from '@components/loader'
import { ModelChampion } from '@components/model-champion'
import { ModelTabs } from '@components/model-tabs'
import { useAppContext } from '@context/index'
import { AssetType } from '@customtypes/constants'
import { SET_SELECTED_SKIN } from '@customtypes/index'
import { useCharacterQuery } from '@graphql/generated/types'
import { Box } from '@mui/material'
import { capitalize, getSplashArtLink } from '@utils/index'
import Image from 'next/image'
import { useState } from 'react'

export const ModelExplorer = () => {
  const [{ selectedChampion }, dispatch] = useAppContext()
  const [selected, setSelected] = useState<string>()

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

  const url = model?.url
  const assets = data?.character?.assets?.filter((a) => {
    return [AssetType.SFX, AssetType.VO].includes(a?.type as AssetType)
  })

  const onSearch = (
    e: React.SyntheticEvent<Element, Event>,
    value: { label: string; value: string } | undefined,
    reason: string,
  ) => {
    setSelected(value?.label)

    if (!value) return

    dispatch({
      type: SET_SELECTED_SKIN,
      payload: value.value,
    })
  }

  return (
    <div className='flex flex-col md:flex-row h-[80vh]'>
      <div className='h-3/6 w-full md:w-4/6 md:min-h-full overflow-scroll'>
        {data ? <ModelTabs data={data} /> : <Loader />}
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
              label='Select a skin'
              muiClasses={{
                autoComp: {
                  root: 'bg-white/30 py-2',
                },
                textField: {
                  root: 'text-primary text-lg',
                  notchedOutline: '!border-primary',
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
