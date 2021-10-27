import { ItemSelect } from '@components/ItemSelect'
import SpellRow from '@components/SpellRow'
import LinearProgress from '@mui/material/LinearProgress'
import { selectPlayerChampion } from '@store/slices/championSlice'
import Tippy from '@tippyjs/react'
import { useSelector } from 'react-redux'

export const Details = () => {
  const playerChampion = useSelector(selectPlayerChampion)
  const { passive, spells, stats, skins, tags, info } = playerChampion

  console.log(playerChampion)

  return (
    <div>
      <div className='text-center'>
        <p className='font-montserrat text-4xl uppercase'>{playerChampion.name}</p>
        <span className='text-gray-600'>{tags?.map((t) => `${t}, `)}</span>
      </div>
      <div className='w-auto flex flex-col justify-center items-center mb-8'>
        {Object.entries(info || {}).map(([key, value]) => (
          <div key={key}>
            <p className='capitalize'>{key}</p>
            <LinearProgress
              variant='determinate'
              value={value * 10}
              sx={{ width: 300, height: 10, borderRadius: 5, marginBottom: 1 }}
            />
          </div>
        ))}
      </div>
      <div>
        <div className='flex'>
          <img
            className='shadow h-7 rounded-b bottom-1 rounder-tl border border-yellow-100'
            src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/passive/${passive?.image.full}`}
          />
          <p>{passive?.name}</p>
        </div>
        <div>
          <Tippy content={passive?.description} placement='right-start'>
            <div
              className='overflow-hidden'
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical' as any,
                WebkitLineClamp: 3,
              }}
            >
              <p className='text-xs'>{passive?.description}</p>
            </div>
          </Tippy>
        </div>
      </div>
      <div>
        {spells?.map((s) => (
          <SpellRow
            key={s.name}
            spellKey={s?.id?.charAt(s?.id?.length - 1)}
            image={{
              ...s.image,
              src: `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/${s?.image?.full}`,
            }}
            tooltip={s?.tooltip}
            title={s?.name}
          />
        ))}
      </div>
      <ItemSelect />
    </div>
  )
}
