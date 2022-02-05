import { Asset } from '@customtypes/index'
import { PlayCircleOutline } from '@mui/icons-material'
import { FC } from 'react'

export const SoundList: FC<{ options?: Asset[] }> = ({ options }) => {
  return (
    <div className='font-nunito'>
      {options?.map((o) => (
        <div key={o?.path} className='flex justify-center'>
          <PlayCircleOutline fontSize='small' />
          <p className='mx-2 truncate w-1/2'>{o?.name}</p>
          <p>0.07s</p>
        </div>
      ))}
    </div>
  )
}
