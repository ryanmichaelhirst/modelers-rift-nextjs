import { GlassCard } from '@components/glass-card'
import {
  FilterList,
  FormatListNumberedOutlined,
  PauseOutlined,
  PlayArrow,
  SkipNext,
  SkipPrevious,
} from '@mui/icons-material'
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
  listPopupState: ReturnType<typeof usePopupState>
  filterPopupState: ReturnType<typeof usePopupState>
}> = ({
  asset,
  duration,
  durationEnabled,
  onNext,
  onPrev,
  placeholder,
  listPopupState,
  filterPopupState,
}) => {
  const isPlaying = asset

  return (
    <GlassCard classes='text-white font-nunito'>
      <div className='flex justify-center mb-2 w-full truncate'>
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
        <FilterList
          className='cursor-pointer mr-4 hover:text-gum-400'
          {...bindToggle(filterPopupState)}
        />
        <SkipPrevious className='cursor-pointer mr-4 hover:text-gum-400' onClick={onPrev} />
        {isPlaying ? (
          <PauseOutlined className='cursor-pointer mr-4 hover:text-gum-400' />
        ) : (
          <PlayArrow className='cursor-pointer mr-4 hover:text-gum-400' />
        )}
        <SkipNext className='cursor-pointer mr-4 hover:text-gum-400' onClick={onNext} />
        <FormatListNumberedOutlined
          className='cursor-pointer hover:text-gum-400'
          {...bindToggle(listPopupState)}
        />
      </div>
    </GlassCard>
  )
}
