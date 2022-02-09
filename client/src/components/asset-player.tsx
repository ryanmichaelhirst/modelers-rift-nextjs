import { GlassCard } from '@components/GlassCard'
import { PauseOutlined, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'
import { Slider } from '@mui/material'
import { bindToggle, usePopupState } from 'material-ui-popup-state/hooks'
import { FC } from 'react'
import { getAssetDisplayName } from '../utils'

export const AssetPlayer: FC<{
  asset?: string | null
  durationEnabled?: boolean
  duration?: number
  onNext: () => void
  onPrev: () => void
  placeholder: string
  popupState: ReturnType<typeof usePopupState>
}> = ({ asset, duration, durationEnabled, onNext, onPrev, placeholder, popupState }) => {
  const isPlaying = asset

  return (
    <GlassCard classes='text-white font-nunito'>
      <div className='flex justify-center mb-2 capitalize w-full truncate'>
        {asset ? getAssetDisplayName(asset) : placeholder}
      </div>
      {durationEnabled && (
        <div>
          <Slider aria-label='track-time' size='small' value={0} max={0} />
          <div className='flex justify-between'>
            {duration && <p>0</p>}
            {/* TODO: use date-fns here */}
            {duration && <p>{new Date(duration * 1000).toISOString().substr(14, 5)}</p>}
          </div>
        </div>
      )}

      <div className='flex justify-center'>
        <SkipPrevious className='cursor-pointer hover:text-gum-400' onClick={onPrev} />
        {isPlaying ? (
          <PauseOutlined className='cursor-pointer mx-4 hover:text-gum-400' />
        ) : (
          <PlayArrow className='cursor-pointer mx-4 hover:text-gum-400' />
        )}
        <SkipNext className='cursor-pointer hover:text-gum-400' onClick={onNext} />
      </div>
      <div className='flex'>
        <p className='cursor-pointer' {...bindToggle(popupState)}>
          View All
        </p>
      </div>
    </GlassCard>
  )
}
