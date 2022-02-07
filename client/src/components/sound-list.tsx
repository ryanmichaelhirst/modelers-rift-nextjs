import { Asset, SET_CURRENT_SOUND } from '@customtypes/index'
import { PlayCircleOutline } from '@mui/icons-material'
import classNames from 'classnames'
import { FC } from 'react'
import { useAppContext } from '../context'

export const SoundList: FC<{ options?: Asset[] }> = ({ options }) => {
  const [{ currentSound }, dispatch] = useAppContext()

  const onClick = (path?: string | null) => () => {
    if (path === null) return

    dispatch({ type: SET_CURRENT_SOUND, payload: path })
  }

  return (
    <div className='font-nunito'>
      {options?.map((o) => (
        <div
          key={o?.path}
          className={classNames(
            'cursor-pointer flex justify-center items-center hover:text-gum-400',
            currentSound === o?.path && 'text-gum-400',
          )}
          onClick={onClick(o?.path)}
        >
          <PlayCircleOutline fontSize='small' />
          <p className='capitalize truncate w-1/2 mx-2'>{o?.name?.replace(/_/g, ' ')}</p>
          <p>0.07s</p>
        </div>
      ))}
    </div>
  )
}
