import { PauseOutlined, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'
import classNames from 'classnames'
import { FC } from 'react'

const iconClass = classNames('cursor-pointer mr-4 opacity-50 hover:opacity-100')

export const AudioControls: FC<{
  isPlaying: boolean
  onPrev: any
  onNext: any
  onPlay: any
  onPause: any
}> = ({ isPlaying, onPrev, onNext, onPlay, onPause }) => {
  return (
    <div className='text-primary flex justify-center'>
      <SkipPrevious className={iconClass} onClick={onPrev} />
      {isPlaying ? (
        <PauseOutlined className={iconClass} onClick={onPause} />
      ) : (
        <PlayArrow className={iconClass} onClick={onPlay} />
      )}
      <SkipNext className={iconClass} onClick={onNext} />
    </div>
  )
}
