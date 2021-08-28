import React from 'react'
import ImageTextRow from './IconTextRow'

const ChampionCard = ({ champion }: { champion: any }) => {
  if (!champion) return null

  const { name, passive, spells } = champion

  return (
    <div className='w-80 border-4 border-black rounded-lg shadow-lg p-4'>
      <div>
        <p>{champion.name}</p>
      </div>
      <div className='mb-3'>
        <img
          className='mr-3 border-4 border-yellow-100 rounded-lg'
          alt={`${champion.name} loading image`}
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`}
        />
      </div>
      <div className='flex mb-3'>
        <ImageTextRow
          image={{
            ...passive.image,
            src: `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/passive/${passive.image.full}`,
          }}
          text={passive.description}
        />
      </div>
      <div>
        {spells.map((s) => (
          <ImageTextRow
            image={{
              ...s.image,
              src: `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/${s.image.full}`,
            }}
            text={s.description}
          />
        ))}
      </div>
    </div>
  )
}

export default ChampionCard
