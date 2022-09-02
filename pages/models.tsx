import { AssetTable } from '@components/asset-table'
import { Button } from '@components/button'
import { ComboBox } from '@components/combo-box'
import type { Animator } from '@components/model'
import { useAppContext } from '@context/index'
import { AssetType, HTTP_SAFE_CHAMPION_NAMES } from '@customtypes/constants'
import { SET_SELECTED_SKIN } from '@customtypes/index'
import { Combobox } from '@headlessui/react'
import { DownloadIcon, PauseIcon, PlayIcon } from '@heroicons/react/outline'
import { dataDragonService } from '@lib/ddragon'
import { capitalize } from '@utils/index'
import type { Asset } from '@utils/trpc'
import { trpc } from '@utils/trpc'
import classNames from 'classnames'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { FC, PropsWithChildren, Suspense, useEffect, useRef, useState } from 'react'

const DynamicModel = dynamic(() => import('../components/model'), {
  suspense: true,
})

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

export const Models: NextPage = () => {
  const [{ selectedChampion }, dispatch] = useAppContext()
  const { data } = trpc.useQuery([
    'character.get',
    {
      filter: {
        nameEq: selectedChampion.basicInfo?.name?.toLowerCase(),
      },
      includeAssets: true,
    },
  ])
  const [tab, setTab] = useState('Animations')
  const [searchValue, setSearch] = useState<Asset>()
  const [selectedAnimation, setSelectedAnimation] = useState<string>()
  const [modelConfig, setModelConfig] = useState<Animator>()
  const [selectedAsset, setSelectedAsset] = useState<Asset>()
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement>()

  const [query, setQuery] = useState('')
  const championName = capitalize(selectedChampion.basicInfo?.name)
  const models = data?.assets?.filter((a) => a?.type === 'model') ?? []
  const model = models.find((m) => m?.skin === selectedChampion.skin)
  const modelUrl = model?.url
  const assets = data?.assets?.filter((a) => {
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

  const onSearch = (value: Asset) => {
    if (!value || !value.skin) return

    setSearch(value)

    dispatch({
      type: SET_SELECTED_SKIN,
      payload: value.skin,
    })
  }

  const onRowClick = (asset?: Asset) => () => {
    // prevent re-creating audio when url is the same
    if (asset === selectedAsset) return

    setSelectedAsset(asset)
  }

  const onTabChange = (e: any) => {
    setTab(e.target.id)
  }

  const onExport = async () => {
    const championName = `${selectedChampion.basicInfo?.name?.toLowerCase()}`
    const key = `models/${championName}/${selectedChampion.skin}.glb`
    const resp = await fetch('/api/aws', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
      }),
    })

    const Body = resp.body

    if (Body instanceof ReadableStream) {
      const response = new Response(Body)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.setAttribute('download', `${championName}.glb`)
      document.body.appendChild(link)
      link.click()

      // clean up url and fake link
      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    }
  }

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setQuery(value)
  }

  const afterLeave = () => setQuery('')

  const filtered = (() => {
    if (query === '') return models

    return models.filter((m) =>
      m?.name?.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')),
    )
  })()

  return (
    <div className='flex flex-col md:space-x-10 md:flex-row pb-10 h-full'>
      <div className='md:min-w-[500px] md:min-h-full overflow-hidden'>
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
                            'flex text-left cursor-pointer items-center hover:text-primary',
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
                  onRowClick={onRowClick}
                  selectedAsset={selectedAsset}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className='md:w-4/6 md:min-h-full'>
        <div className='flex items-center mb-4'>
          <span className='mr-6 text-lg'>{selectedChampion.basicInfo?.name}</span>
          <Button
            onClick={onExport}
            text='Download'
            classes={{ button: 'text-xs !px-3 !py-1.5 !rounded' }}
            icon={<DownloadIcon className='h-4 w-4' />}
          />
        </div>
        <ComboBox
          onInput={onInput}
          onSearch={onSearch}
          selected={searchValue}
          afterLeave={afterLeave}
          displayValue={(model: Asset) => model?.name ?? ''}
          classes={{ box: 'z-20 w-72' }}
          showIcon={false}
          placeholder='Search skins...'
        >
          {filtered.length === 0 && query !== '' ? (
            <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
              Nothing found.
            </div>
          ) : (
            filtered.map((model) => (
              <Combobox.Option
                key={model?.id}
                className={({ active }) =>
                  classNames(
                    'relative capitalize cursor-default select-none py-0 pl-10 pr-4',
                    active ? 'bg-primary text-white' : 'text-tertiary',
                  )
                }
                value={model}
              >
                {({ selected }) => (
                  <>
                    <Image
                      height='20'
                      width='20'
                      src={
                        model?.name?.includes('Chroma')
                          ? '/no-image.jpg'
                          : dataDragonService.getSplashArtLink(
                              championName,
                              model?.skin?.replace('skin', '') ?? '',
                            )
                      }
                      className='rounded'
                      alt={model?.name ?? ''}
                    />
                    <span
                      className={classNames(
                        'ml-4 inline-block truncate',
                        selected && 'font-medium',
                      )}
                    >
                      {model?.name}
                    </span>
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </ComboBox>
        <Suspense fallback={<p>Loading...</p>}>
          {modelUrl && <DynamicModel url={modelUrl} onSetModelConfig={onSetModelConfig} />}
        </Suspense>
      </div>
    </div>
  )
}

export default Models
