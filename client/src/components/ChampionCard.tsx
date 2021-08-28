import React from 'react'
import ImageTextRow from './ImageTextRow'

const ChampionCard = ({ champion }: { champion: any }) => {
  if (!champion) return null

  const { name, passive, spells } = champion

  console.log(champion)

  return (
    <div className='w-80 border-4 border-black rounded-xl shadow-lg px-3 py-2 bg-gray-200'>
      <div className='bg-gray-800 rounded-sm shadow-lg px-2 py-1 my-3 text-2xl text-yellow-300'>
        <span className='font-montserrat'>{champion.name}, </span>
        <span className='italic text-xl capitalize'>{champion.title}</span>
      </div>
      <div className='mb-3'>
        <img
          className='mr-3 border-4 border-yellow-100 rounded-lg'
          alt={`${champion.name} loading image`}
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`}
        />
        {champion.tags.map((t) => (
          <span
            key={t}
            className='relative bottom-4 rounded shadow p-2 mr-2 bg-yellow-300 text-gray-500 font-semibold text-sm'
          >
            {t}
          </span>
        ))}
      </div>
      <div className='flex mb-3'>
        <ImageTextRow
          image={{
            ...passive.image,
            src: `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/passive/${passive.image.full}`,
          }}
          text={passive.description}
          tooltip={passive.description}
          title={passive.name}
        />
      </div>
      <div>
        {spells.map((s) => (
          <ImageTextRow
            key={s.name}
            image={{
              ...s.image,
              src: `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/${s.image.full}`,
            }}
            text={s.description}
            tooltip={s.tooltip}
            title={s.name}
          />
        ))}
      </div>
    </div>
  )
}

export default ChampionCard
