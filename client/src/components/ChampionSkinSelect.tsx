import { setSelectedSkin } from '@store/slices/championSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

const ChampionSkinSelect = ({ skins }: { skins?: any[] }) => {
  const dispatch = useDispatch()

  const onClick = (src: string) => dispatch(setSelectedSkin(src))

  return (
    <>
      <p className='font-bold text-lg text-white mb-5'>Skins</p>
      <div className='flex'>
        {skins?.map((s) => (
          <img
            key={s.id}
            src={s.src}
            className='rounded-md mr-2 h-14 w-14 object-cover object-top'
            alt={s.name}
            onClick={() => onClick(`skin${s.num}`)}
          />
        ))}
      </div>
    </>
  )
}

export default ChampionSkinSelect
