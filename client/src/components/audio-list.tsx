import { Asset, SET_CURRENT_SOUND } from '@customtypes/index'
import { PlayCircleOutline } from '@mui/icons-material'
import classNames from 'classnames'
import { FC } from 'react'
import { useAppContext } from '../context'
import { getAssetDisplayName } from '../utils'

export const AudioList: FC<{ audios?: Asset[] }> = ({ audios }) => {
  const [{ currentSound }, dispatch] = useAppContext()

  const onClick = (path?: string | null) => () => {
    if (path === null) return

    dispatch({ type: SET_CURRENT_SOUND, payload: path })
  }

  return (
    <div className='font-nunito flex items-center'>
      <div className='basis-1/12'></div>
      <div className='flex flex-col'>
        {audios?.map((a) => (
          <div
            key={a?.path}
            className={classNames(
              'cursor-pointer flex w-full self-start hover:text-gum-400',
              currentSound === a?.path && 'text-gum-400',
            )}
            onClick={onClick(a?.path)}
          >
            <PlayCircleOutline className='basis-1/12' fontSize='small' />
            <p
              title={getAssetDisplayName(a?.name)}
              className='capitalize basis-10/12 mx-2 truncate'
            >
              {getAssetDisplayName(a?.name)}
            </p>
            <p className='basis-1/12'>0.07s</p>
          </div>
        ))}
      </div>

      <div className='basis-1/12'>hi</div>
    </div>
  )
}
