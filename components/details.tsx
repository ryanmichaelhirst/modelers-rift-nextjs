import { Card } from '@components/card'
import { ItemSelect } from '@components/item-select'
import { SpellTitle, Tooltip } from '@components/tooltip'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppContext } from '../context'

export const Details = () => {
  const [{ selectedChampion }] = useAppContext()

  if (!selectedChampion.detailedInfo) return <div>Loading...</div>

  const { passive, spells, name, title, tags, info, image } = selectedChampion.detailedInfo

  return (
    <Card>
      <div className='flex items-center justify-around'>
        <img
          className='rounded-full h-24 w-24'
          src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/${image?.full}`}
        />
        <div className='text-center'>
          <p className='font-montserrat text-4xl uppercase'>{name}</p>
          <p className='font-montserrat text-xl capitalize'>{title}</p>
          <span className='text-gray-600'>{tags?.map((t) => `${t}, `)}</span>
        </div>
      </div>

      <p>Spells</p>
      <div className='flex my-4'>
        <Tooltip title={<SpellTitle spell={passive as any} />}>
          <img
            className='shadow h-7 rounded-b rounder-tl mr-2'
            src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/passive/${passive?.image?.full}`}
          />
        </Tooltip>
        {spells?.map((s) => {
          return (
            <Tooltip key={s.id} title={<SpellTitle spell={s} />}>
              <img
                className='shadow h-7 rounded-b rounder-tl mr-2'
                src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/${s?.image?.full}`}
              />
            </Tooltip>
          )
        })}
      </div>

      <p>Stats</p>
      <div className='flex flex-col'>
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
      <div className='flex flex-col'>
        <ItemSelect />
      </div>
    </Card>
  )
}
