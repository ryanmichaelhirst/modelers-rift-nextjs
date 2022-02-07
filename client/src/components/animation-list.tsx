import { ChampionAnimations } from '@customtypes/index'
import { Videocam } from '@mui/icons-material'
import classNames from 'classnames'
import { FC } from 'react'

export const AnimationList: FC<{
  championAnimations: ChampionAnimations
  onAnimationClick: (animation: string) => () => void
}> = ({ championAnimations, onAnimationClick }) => {
  return (
    <div className='flex flex-col items-center text-lg font-nunito'>
      {championAnimations.animations?.map((a) => (
        <div
          key={a}
          id={a}
          className={classNames(
            'flex items-center capitalize w-3/4 cursor-pointer hover:text-gum-400',
            a === championAnimations.selectedAnimation && 'text-gum-400',
          )}
          title={a}
          onClick={onAnimationClick(a)}
        >
          <Videocam fontSize='small' />
          <p className='mx-2 truncate'>{a.replace(/_/g, ' ')}</p>
        </div>
      ))}
    </div>
  )
}
