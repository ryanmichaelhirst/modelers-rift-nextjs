import { Card } from '@components/Card'
import { ItemSelect } from '@components/ItemSelect'
import { Tooltip } from '@components/Tooltip'
import LinearProgress from '@mui/material/LinearProgress'
import { selectPlayerChampion } from '@store/slices/championSlice'
import { useSelector } from 'react-redux'

export const Details = () => {
  const playerChampion = useSelector(selectPlayerChampion)
  const { passive, spells, stats, skins, tags, info } = playerChampion

  return (
    <Card>
      <div className='flex items-center justify-around'>
        <img
          className='rounded-full h-24 w-24'
          src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/${playerChampion.image?.full}`}
        />
        <div className='text-center'>
          <p className='font-montserrat text-4xl uppercase'>{playerChampion.name}</p>
          <p className='font-montserrat text-xl capitalize'>{playerChampion.title}</p>
          <span className='text-gray-600'>{tags?.map((t) => `${t}, `)}</span>
        </div>
      </div>

      <p>Spells</p>
      <div className='flex my-4'>
        <Tooltip title={passive?.description || ''}>
          <img
            className='shadow h-7 rounded-b rounder-tl mr-2'
            src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/passive/${passive?.image.full}`}
          />
        </Tooltip>
        {spells?.map((s) => (
          <Tooltip key={s.id} title={passive?.description || ''}>
            <img
              className='shadow h-7 rounded-b rounder-tl mr-2'
              src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/${s?.image?.full}`}
            />
          </Tooltip>
        ))}
      </div>

      <p>Stats</p>
      <div className='flex flex-row'>
        <div className='flex flex-col' style={{ flex: '0 0 50%' }}>
          {Object.entries(info || {}).map(([key, value]) => (
            <div key={key}>
              <p className='capitalize'>{key}</p>
              <LinearProgress
                className='w-full rounded mb-2'
                variant='determinate'
                value={value * 10}
                sx={{ height: '8px' }}
              />
            </div>
          ))}
        </div>
        <div className='flex flex-col' style={{ flex: '0 0 50%' }}>
          <ItemSelect />
        </div>
      </div>
    </Card>
  )
}
