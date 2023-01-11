import { AssetTable } from '@/components/asset-table'
import { Button } from '@/components/button'
import type { Animator } from '@/components/model'
import { AssetType, HTTP_SAFE_CHAMPION_NAMES } from '@/types/constants'
import type { Asset } from '@/utils/trpc'
import { trpc } from '@/utils/trpc'
import { DownloadIcon, PauseIcon, PlayIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, Suspense, useEffect, useRef, useState } from 'react'
import { useModelStore } from 'store'

export const defaultModelHref = '/model/aatrox'

const Model = dynamic(() => import('../../components/model').then((m) => m.Model))
const Modal = dynamic(() => import('../../components/modal').then((m) => m.Modal))
const SkinSearchBar = dynamic(() =>
  import('../../components/skin-search-bar').then((m) => m.SkinSearchBar),
)

const Tab: FC<PropsWithChildren<{ onClick: any; tab: string; id: string }>> = ({
  tab,
  id,
  onClick,
  children,
}) => (
  <p
    className={classNames(
      'cursor-pointer font-nunito opacity-50 hover:opacity-100',
      tab === id && '!opacity-100',
    )}
    id={id}
    onClick={onClick}
  >
    {children}
  </p>
)

export const Models: NextPage = () => {
  const router = useRouter()
  const { name } = router.query
  const skin = useModelStore((state) => state.skin)
  const setSkin = useModelStore((state) => state.setSkin)

  const { data } = trpc.character.get.useQuery({
    filter: {
      nameEq: name as string,
    },
    includeAssets: true,
  })
  const { data: user } = trpc.user.current.useQuery({ includeDonations: true })

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const [tab, setTab] = useState('Animations')
  const [searchValue, setSearch] = useState<Asset>()
  const [selectedAnimation, setSelectedAnimation] = useState<string>()
  const [modelConfig, setModelConfig] = useState<Animator>()
  const [selectedAsset, setSelectedAsset] = useState<Asset>()
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true)
  const audioRef = useRef<HTMLAudioElement>()

  const [query, setQuery] = useState('')
  const models = data?.assets?.filter((a) => a?.type === 'model') ?? []
  const model = models.find((m) => m?.skin === skin)
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
    setSkin(value.skin)
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
    // if the user has not made any donations, display the donation modal
    if (user?.donations.length === 0) {
      setIsDonationModalOpen(true)

      return
    }

    const characterName = data?.name

    const signedUrl = await fetch(`/api/aws/signedUrl`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: `models/${characterName}/${skin}.glb`,
      }),
    }).then((res) => res.text())

    const downloadReq = await fetch(signedUrl)
    const Body = downloadReq.body

    if (Body instanceof ReadableStream) {
      const response = new Response(Body)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.setAttribute('download', `${characterName}.glb`)
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

  const onCloseDonationModal = () => {
    setIsDonationModalOpen(false)

    router.push('/donate')
  }

  return (
    <div className='flex h-full flex-col pb-10 md:flex-row md:space-x-10'>
      <Suspense fallback={'Loading'}>
        <Modal isOpen={isDonationModalOpen} onClose={onCloseDonationModal} />
      </Suspense>
      <div className='overflow-hidden md:min-h-full md:min-w-[500px]'>
        {data && (
          <div className='card'>
            <div className='flex space-x-5 border-b border-slate-200 pb-1 text-primary'>
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
                  <thead className='block border-b border-slate-200'>
                    <tr className='flex text-left text-slate-400'>
                      <th className='w-1/12 py-2 font-normal'></th>
                      <th className='w-1/12 py-2 font-normal'>#</th>
                      <th className='w-10/12 py-2 font-normal'>Title</th>
                    </tr>
                  </thead>
                  <tbody className='block h-[100px] md:h-[500px] overflow-y-scroll'>
                    {modelConfig?.animationNames?.map((a, idx) => {
                      const Icon = isAnimationPlaying ? PauseIcon : PlayIcon

                      return (
                        <tr
                          onClick={onAnimationChange(a)}
                          key={a}
                          className={classNames(
                            a === selectedAnimation
                              ? 'font-semibold text-primary'
                              : 'text-slate-400',
                            'flex cursor-pointer items-center text-left hover:text-primary',
                          )}
                        >
                          <td className='w-1/12 py-1'>
                            {a === selectedAnimation && (
                              <Icon
                                className='h-5 w-5 text-primary'
                                onClick={onPlayPauseAnimation}
                              />
                            )}
                          </td>
                          <td className='w-1/12 py-1'>{idx}</td>
                          <td className='w-10/12 py-1'>{a}</td>
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
      <div className='h-[500px] mt-2 md:min-h-full md:w-4/6 md:mt-0'>
        <div className='mb-4 flex items-center'>
          <span className='mr-6 text-lg'>{data?.displayName}</span>
          <Button
            onClick={onExport}
            text='Download'
            classes={{ button: 'text-xs !px-3 !py-1.5 !rounded' }}
            icon={<DownloadIcon className='h-4 w-4' />}
          />
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <SkinSearchBar
            onInput={onInput}
            onSearch={onSearch}
            searchValue={searchValue}
            afterLeave={afterLeave}
            filtered={filtered}
            query={query}
            data={data}
          />
          {modelUrl && <Model url={modelUrl} onSetModelConfig={onSetModelConfig} />}
        </Suspense>
      </div>
    </div>
  )
}

export default Models
