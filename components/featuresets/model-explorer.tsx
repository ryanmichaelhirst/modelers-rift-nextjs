import { AnimationTable } from '@components/animation-table'
import { Input } from '@components/input'
import { Loader } from '@components/loader'
import { Animator, Model } from '@components/model'
import { ModelTabs } from '@components/model-tabs'
import { useAppContext } from '@context/index'
import { SET_CURRENT_ANIMATION, SET_SELECTED_SKIN } from '@customtypes/index'
import { useCharacterQuery } from '@graphql/generated/types'
import { Box } from '@mui/material'
import { capitalize, getSplashArtLink } from '@utils/index'
import Image from 'next/image'
import { useState } from 'react'

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
  const [searchValue, setSearch] = useState<string>()
  const [selectedAnimation, setSelectedAnimation] = useState<string>()
  const [modelConfig, setModelConfig] = useState<Animator>()

  const championName = capitalize(selectedChampion.basicInfo?.name)
  const models = data?.character?.assets?.filter((a) => a?.type === 'model') ?? []
  const model = models.find((m) => m?.skin === selectedChampion.skin)
  const modelUrl = model?.url

  const onAnimationChange = (animation: string) => () => {
    modelConfig?.mixer?.stopAllAction()

    setSelectedAnimation(animation)
    dispatch({ type: SET_CURRENT_ANIMATION, payload: animation })

    const clip = modelConfig?.clips.find((c) => c.name === animation)
    if (!clip) return
    const action = modelConfig?.mixer?.clipAction(clip)
    if (!action) return

    action.play()
  }

  const onSetModelConfig = async (value: Animator) => {
    if (modelConfig) modelConfig.dispose()

    const animations = value.clips.map((c) => c.name)
    const action = value.mixer?.clipAction(value.clips[0])
    action?.play()

    setSelectedAnimation(animations[0])
    setModelConfig(value)
  }

  const onSearch = (
    e: React.SyntheticEvent<Element, Event>,
    value: { label: string; value: string } | undefined,
    reason: string,
  ) => {
    if (!value) return

    setSearch(value.label)

    dispatch({
      type: SET_SELECTED_SKIN,
      payload: value.value,
    })
  }

  return (
    <div className='flex flex-col md:flex-row h-[80vh]'>
      <div className='h-3/6 w-full md:w-4/6 md:min-h-full overflow-scroll'>
        {data ? (
          <ModelTabs
            data={data}
            AnimationTable={
              <AnimationTable
                selectedAnimation={selectedAnimation}
                animations={modelConfig?.names ?? []}
                onClick={onAnimationChange}
              />
            }
          />
        ) : (
          <Loader />
        )}
      </div>
      {modelUrl && (
        <div className='h-3/6 w-full md:w-2/6 md:min-h-full'>
          <div className='px-6 flex justify-between'>
            <span>{selectedChampion.basicInfo?.name}</span>
            <span>{model?.name}</span>
          </div>
          <div className='px-6'>
            <Input
              value={searchValue}
              onChange={onSearch}
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
          {modelUrl ? (
            <Model url={modelUrl} onSetModelConfig={onSetModelConfig} />
          ) : (
            <div className=''></div>
          )}
        </div>
      )}
    </div>
  )
}
