import React from 'react'
import ChampionTabs from './ChampionTabs'
import Background1 from '../assets/bg-blue.png'
import Background2 from '../assets/bg-yellow.png'

const Backgrounds = {
  1: Background1,
  2: Background2,
}

const ChampionCard = ({ champion, bg }: { champion: any; bg: number }) => {
  if (!champion) return null

  const background = Backgrounds[bg]

  return (
    <div
      className='w-80 border-4 border-black rounded-xl shadow-lg px-3 py-2 bg-cover bg-center'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className='bg-gray-800 rounded-sm shadow-lg px-2 py-1 my-3 text-2xl text-yellow-300'>
        <span className='font-montserrat'>{champion.name}, </span>
        <span className='italic text-xl capitalize'>{champion.title}</span>
      </div>
      <div className='mb-3'>
        <img
          className='mr-3 border-4 border-yellow-100 rounded-lg'
          alt={`${champion.name} loading image`}
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_0.jpg`}
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
      <ChampionTabs champion={champion} />
    </div>
  )
}

export default ChampionCard
