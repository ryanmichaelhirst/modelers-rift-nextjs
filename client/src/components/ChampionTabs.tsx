import React from 'react'
import ImageTextRow from './ImageTextRow'
import Tabs from './Tabs'
import { STAT_OPTIONS } from '../types/constants'

const ChampionTabs = ({ champion }: { champion: any }) => {
  const { passive, spells, stats, skins } = champion

  const options = [
    {
      tab: 'Spells',
      content: (
        <>
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
        </>
      ),
    },
    {
      tab: 'Stats',
      content: STAT_OPTIONS.map((s) => (
        <div key={s.value}>
          <span className='mr-3'>{s.label}</span>
          <span>{stats[s.value]}</span>
        </div>
      )),
    },
    {
      tab: 'Skins',
      content: (
        <>
          <div className='my-2 text-xs italic font-montserrat'>Hover for skin name</div>
          {skins.map((s) => (
            <div className='inline-block mr-2 mb-2' key={s.id}>
              <img
                className='h-28 rounded'
                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_${s.num}.jpg`}
                title={s.name}
              />
            </div>
          ))}
          ,
        </>
      ),
    },
    {
      tab: 'Tips',
      content: (
        <ul className='list-decimal list-inside'>
          {champion.allytips.concat(champion.enemytips).map((t, idx) => (
            <li className='text-xs' key={`tip-${idx}`}>
              {t}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return <Tabs options={options} />
}

export default ChampionTabs
