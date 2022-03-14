import { AssetPlayer } from '@components/asset-player'
import { AssetTable } from '@components/asset-table'
import { GlassCard } from '@components/glass-card'
import { SkinCarousel } from '@components/skin-carousel'
import { useAppContext } from '@context/index'
import { useCharacterQuery } from '@graphql/generated/types'
import { BarChartOutlined, HeadphonesOutlined, VideocamOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import classNames from 'classnames'
import { MouseEvent, useState } from 'react'

const InteractiveCard = () => {
  const [{ selectedChampion }] = useAppContext()
  const { data, loading: characterLoading, error } = useCharacterQuery({
    variables: {
      filter: {
        nameEq: selectedChampion.basicInfo?.name?.toLowerCase(),
      },
      includeAssets: true,
    },
  })
  const [selectedIcon, setSelectedIcon] = useState('audio')

  const sfx = data?.character?.assets?.filter((a) => ['sfx', 'vo'].includes(a?.type || ''))
  console.log({ data, sfx, error })

  const onIconClick = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedIcon(e.currentTarget.value)
  }

  return (
    <GlassCard classes='flex flex-col h-full min-h-0' hasPadding={false}>
      <div className='flex-initial p-7'>
        <p className='text-slate-500 pb-0 text-sm font-nunito font-bold'>
          {selectedChampion.skin ?? 'Default'}
        </p>
        <p className='text-sunset-900 text-2xl font-nunito pb-2'>
          {selectedChampion.basicInfo?.name}
        </p>
        <SkinCarousel />
      </div>
      <div className='flex-grow flex flex-col min-h-0'>
        <GlassCard
          classes='flex-auto flex flex-col bg-white/70 rounded-t-lg p-4 min-h-0'
          hasPadding={false}
          rounded={false}
        >
          <div className='flex-initial'>
            <div className='text-[#FF6BD0] bg-[#FECFEF] inline-block px-4 py-1 rounded-xl text-sm font-semibold'>
              Audios
            </div>
          </div>
          <div className='flex-grow mt-4 min-h-0 overflow-y-auto'>
            <AssetTable data={sfx} />
          </div>
          <div className='flex-auto flex items-end'>
            <div className='flex-auto'>
              <AssetPlayer assetType={'audio'} assets={sfx} placeholder={'Pick a sound'} />
            </div>
          </div>
        </GlassCard>
        <div className='flex flex-[0_0_50px] items-center justify-start rounded-b-lg bg-white'>
          <div className='pl-4 py-3'>
            <IconButton
              className={classNames(
                selectedIcon === 'audio' && 'bg-sunset-900 text-white hover:bg-sunset-900',
              )}
              value='audio'
              onClick={onIconClick}
              size='small'
            >
              <HeadphonesOutlined />
            </IconButton>
            <IconButton
              className={classNames(
                selectedIcon === 'animation' && 'bg-sunset-900 text-white hover:bg-sunset-900',
              )}
              value='animation'
              onClick={onIconClick}
              size='small'
            >
              <VideocamOutlined />
            </IconButton>
            <IconButton
              className={classNames(
                selectedIcon === 'analytics' && 'bg-sunset-900 text-white hover:bg-sunset-900',
              )}
              value='analytics'
              onClick={onIconClick}
              size='small'
            >
              <BarChartOutlined />
            </IconButton>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export default InteractiveCard
