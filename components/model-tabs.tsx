import { AnimationTable } from '@components/animation-table'
import { AssetTable } from '@components/asset-table'
import { AudioControls } from '@components/audio-controls'
import { AssetType, HTTP_SAFE_CHAMPION_NAMES } from '@customtypes/constants'
import { Asset } from '@customtypes/index'
import { useCharacterQuery } from '@graphql/generated/types'
import { Slider, Tab, Tabs, tabsClasses } from '@mui/material'
import { FC, PropsWithChildren, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { GlassCard } from './glass-card'

const tabClasses = {
  root: '!text-primary opacity-50 text-xs p-3 min-w-0 hover:opacity-100',
  selected: '!text-primary opacity-100',
}

const TabPanel: FC<PropsWithChildren<{ index: number; value: number }>> = ({
  children,
  index,
  value,
}) => {
  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  )
}

export const ModelTabs = ({ data }: { data: ReturnType<typeof useCharacterQuery>['data'] }) => {
  const [tab, setTab] = useState(0)
  const [selectedAsset, setSelectedAsset] = useState<Asset>()
  const [trackProgress, setTrackProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement>()
  let interval: NodeJS.Timeout | null = null

  const startTimer = () => {
    // set playing to false when the audio playback ends
    interval && clearInterval(interval)

    const id = setInterval(() => {
      if (audioRef?.current?.ended) {
        setIsPlaying(false)
      } else {
        setTrackProgress(audioRef.current?.currentTime ?? 0)
      }
    }, 1000)
    interval = id
  }

  useEffect(() => {
    if (!selectedAsset?.url) return

    audioRef?.current?.pause()
    audioRef.current = new Audio(selectedAsset?.url)
    audioRef.current
      .play()
      .then((res) => setIsPlaying(true))
      .catch((err) => setIsPlaying(false))

    startTimer()
  }, [selectedAsset])

  const onTabChange = (e: SyntheticEvent, value: number) => setTab(value)

  const onRowClick = (asset?: Asset | null) => () => {
    // prevent re-creating audio when url is the same
    if (asset === selectedAsset) {
      setIsPlaying(true)

      return
    }

    setSelectedAsset(asset)
    setIsPlaying(true)
  }

  const onPrev = () => {
    if (!selectedAsset || !assets) return

    const curIndex = assets.findIndex((s) => s?.url === selectedAsset.url)
    const prevIndex = curIndex === assets.length - 1 ? 0 : curIndex - 1
    const prevSound = assets[prevIndex]
    console.log({ prevSound })

    onRowClick(prevSound)
  }

  const onNext = () => {
    if (!selectedAsset || !assets) return

    const curIndex = assets.findIndex((s) => s?.url === selectedAsset.url)
    const nextIndex = curIndex === assets.length - 1 ? 0 : curIndex + 1
    const nextSound = assets[nextIndex]

    onRowClick(nextSound)
  }

  const onPlay = () => setIsPlaying(true)

  const onPause = () => setIsPlaying(false)

  const assets = data?.character?.assets?.filter((a) => {
    return [AssetType.SFX, AssetType.VO].includes(a?.type as AssetType)
  })
  const assetTableProps = { onRowClick, selectedAsset }
  const duration = isNaN(audioRef.current?.duration ?? 0) ? 0 : audioRef.current?.duration

  return (
    <>
      <div className='card'>
        <Tabs
          variant='scrollable'
          scrollButtons={true}
          value={tab}
          onChange={onTabChange}
          classes={{ indicator: 'bg-primary', scrollButtons: 'text-primary' }}
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
        >
          <Tab label='All' value={0} classes={tabClasses} />
          <Tab label='Voice-lines' value={1} classes={tabClasses} />
          <Tab label='Sound-effects' value={2} classes={tabClasses} />
          <Tab label='Animations' value={3} classes={tabClasses} />
          <Tab label='Interactions' value={4} classes={tabClasses} />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <AssetTable data={assets} {...assetTableProps} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <AssetTable data={assets?.filter((a) => a?.type === AssetType.VO)} {...assetTableProps} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <AssetTable
            data={assets?.filter((a) => a?.type === AssetType.SFX)}
            {...assetTableProps}
          />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <AnimationTable />
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <AssetTable
            data={assets?.filter((a) => {
              return HTTP_SAFE_CHAMPION_NAMES.some((champName) => a?.name?.includes(champName))
            })}
            {...assetTableProps}
          />
        </TabPanel>
      </div>
      <GlassCard className='mt-5 border'>
        <div className='flex justify-center w-full truncate text-primary font-nunito'>
          {selectedAsset ? selectedAsset?.name : 'Pick an audio'}
        </div>
        <div>
          <Slider aria-label='track-time' size='small' value={trackProgress} max={duration} />
          <div className='flex justify-between'>
            {duration && <p>0</p>}
            {/* TODO: use date-fns here */}
            {duration && <p>{new Date(duration * 1000).toISOString().substr(14, 5)}</p>}
          </div>
        </div>
        <AudioControls
          isPlaying={isPlaying}
          onNext={onNext}
          onPrev={onPrev}
          onPlay={onPlay}
          onPause={onPause}
        />
      </GlassCard>
    </>
  )
}
