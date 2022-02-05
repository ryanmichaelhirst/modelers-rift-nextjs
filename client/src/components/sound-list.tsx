import { Asset } from '@customtypes/index'
import { PlayCircleOutline } from '@mui/icons-material'
import { FC } from 'react'

export const SoundList: FC<{ options?: Asset[] }> = ({ options }) => {
  const onClick = (filePath?: string | null) => () => {
    fetch(`/api/getAudio/${filePath}`).then((res) => {
      const audio = new Audio(res.url)
      audio.play()
    })
  }

  return (
    <div className='font-nunito'>
      {options?.map((o) => (
        <div
          key={o?.path}
          className='cursor-pointer flex justify-center items-center'
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
