import { useAppContext } from '@context/index'
import { SET_CURRENT_ANIMATION, SET_PLAY_ALL_ANIMATIONS } from '@customtypes/index'
import { Videocam } from '@mui/icons-material'
import classNames from 'classnames'

export const AnimationList = () => {
  const [{ currentAnimation, animations }, dispatch] = useAppContext()

  const onAnimationClick = (animation: string) => () => {
    dispatch({ type: SET_CURRENT_ANIMATION, payload: animation })
    dispatch({ type: SET_PLAY_ALL_ANIMATIONS, payload: false })
  }

  return (
    <div className='flex flex-col text-lg font-nunito'>
      {animations?.map((a) => (
        <div
          key={a}
          id={a}
          className={classNames(
            'flex items-center capitalize cursor-pointer hover:text-gum-400',
            a === currentAnimation && 'text-gum-400',
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
