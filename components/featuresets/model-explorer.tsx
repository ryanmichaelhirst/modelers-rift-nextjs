import { AssetTable } from '@components/asset-table'
import { Input } from '@components/input'
import { Loader } from '@components/loader'
import { Animator, Model } from '@components/model'
import { useAppContext } from '@context/index'
import { AssetType, HTTP_SAFE_CHAMPION_NAMES } from '@customtypes/constants'
import { Asset, SET_SELECTED_SKIN } from '@customtypes/index'
import { useCharacterQuery } from '@graphql/generated/types'
import { PauseIcon, PlayIcon } from '@heroicons/react/outline'
import { Box } from '@mui/material'
import { capitalize, getSplashArtLink } from '@utils/index'
import classNames from 'classnames'
import Image from 'next/image'
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'

const Tab: FC<PropsWithChildren<{ onClick: any; tab: string; id: string }>> = ({
  tab,
  id,
  onClick,
  children,
}) => (
  <p
    className={classNames(
      'font-nunito opacity-50 hover:opacity-100 cursor-pointer',
      tab === id && '!opacity-100',
    )}
    id={id}
    onClick={onClick}
  >
    {children}
  </p>
)

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
  const [tab, setTab] = useState('Animations')
  const [searchValue, setSearch] = useState<string>()
  const [selectedAnimation, setSelectedAnimation] = useState<string>()
  const [modelConfig, setModelConfig] = useState<Animator>()
  const [selectedAsset, setSelectedAsset] = useState<Asset>()
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement>()

  const championName = capitalize(selectedChampion.basicInfo?.name)
  const models = data?.character?.assets?.filter((a) => a?.type === 'model') ?? []
  const model = models.find((m) => m?.skin === selectedChampion.skin)
  const modelUrl = model?.url
  const assets = data?.character?.assets?.filter((a) => {
    return [AssetType.SFX, AssetType.VO].includes(a?.type as AssetType)
  })

  useEffect(() => {
    if (!selectedAsset?.url || selectedAsset.type === 'model') return

    audioRef?.current?.pause()
    audioRef.current = new Audio(selectedAsset?.url)
    // info on audio.play()
    // https://developer.chrome.com/blog/play-request-was-interrupted/
    audioRef.current.play()
  }, [selectedAsset])

  const onAnimationChange = (animation: string) => () => {
    modelConfig?.mixer?.stopAllAction()

    setSelectedAnimation(animation)

    const clip = modelConfig?.clips.find((c) => c.name === animation)
    if (!clip) return
    const action = modelConfig?.mixer?.clipAction(clip)
    if (!action) return

    action.play()
    setIsAnimationPlaying(true)
  }

  const onPlayPauseAnimation = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    const clip = modelConfig?.clips.find((c) => c.name === selectedAnimation)
    if (!clip) return
    const action = modelConfig?.mixer?.clipAction(clip)
    if (!action) return

    action.paused = isAnimationPlaying ? true : false
    setIsAnimationPlaying((prev) => !prev)
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

  const onRowClick = (asset?: Asset | null) => () => {
    // prevent re-creating audio when url is the same
    if (asset === selectedAsset) return

    setSelectedAsset(asset)
  }

  const onTabChange = (e: any) => {
    setTab(e.target.id)
  }

  const assetTableProps = { onRowClick, selectedAsset }

  return (
    <div className='flex flex-col md:space-x-10 md:flex-row pb-10 h-full'>
      <div className='md:min-w-[500px] md:min-h-full overflow-hidden'>
        {loading && <Loader />}
        {data && (
          <div className='card'>
            <div className='flex text-primary space-x-5 pb-1 border-slate-200 border-b'>
              <Tab onClick={onTabChange} id='Animations' tab={tab}>
                Animations
              </Tab>
              <Tab onClick={onTabChange} id='Interactions' tab={tab}>
                Interactions
              </Tab>
              <Tab onClick={onTabChange} id='Sounds' tab={tab}>
                SFX / VO
              </Tab>
            </div>
            <div>
              {tab === 'Animations' ? (
                <table className='w-full font-nunito'>
                  <thead className='block border-slate-200 border-b'>
                    <tr className='flex text-left text-slate-400'>
                      <th className='w-8 py-2 font-normal'></th>
                      <th className='w-12 py-2 font-normal'>#</th>
                      <th className='py-2 font-normal'>Title</th>
                    </tr>
                  </thead>
                  <tbody className='block overflow-y-scroll h-[500px]'>
                    {modelConfig?.animationNames?.map((a, idx) => {
                      const Icon = isAnimationPlaying ? PauseIcon : PlayIcon

                      return (
                        <tr
                          onClick={onAnimationChange(a)}
                          key={a}
                          className={classNames(
                            a === selectedAnimation
                              ? 'text-primary font-semibold'
                              : 'text-slate-400',
                            'flex text-left cursor-pointer hover:text-primary',
                          )}
                        >
                          <td className='py-1 w-8'>
                            {a === selectedAnimation && (
                              <Icon
                                className='text-primary h-5 w-5'
                                onClick={onPlayPauseAnimation}
                              />
                            )}
                          </td>
                          <td className='py-1 w-12'>{idx}</td>
                          <td className='py-1'>{a}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <AssetTable
                  data={
                    tab === 'Interactions'
                      ? assets?.filter((a) => {
                          return HTTP_SAFE_CHAMPION_NAMES.some((champName) =>
                            a?.name?.includes(champName),
                          )
                        })
                      : assets?.filter((a) =>
                          [AssetType.VO, AssetType.SFX].includes(a?.type as any),
                        )
                  }
                  {...assetTableProps}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {modelUrl && (
        <div className='md:w-4/6 md:min-h-full'>
          <div className='flex justify-between'>
            <span>{selectedChampion.basicInfo?.name}</span>
            <span>{model?.name}</span>
          </div>
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
          {modelUrl && <Model url={modelUrl} onSetModelConfig={onSetModelConfig} />}
        </div>
      )}
    </div>
  )
}
