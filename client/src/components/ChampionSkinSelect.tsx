import React from 'react'

const ChampionSkinSelect = ({ skins }: { skins?: any[] }) => {
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
          />
        ))}
      </div>
    </>
  )
}

export default ChampionSkinSelect
