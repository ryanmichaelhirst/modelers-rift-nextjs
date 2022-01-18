import { chooseSkin, selectPlayerChampion } from '@store/slices/championSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAssetsIndexQuery } from '../../../graphql/generated/types'

const SkinSelect = ({ items }: { items: any[] }) => {
  const champion = useSelector(selectPlayerChampion)
  const [selected, setSelected] = useState<Record<string, any>>()
  const { data, error, loading } = useAssetsIndexQuery({
    variables: {
      filter: {
        championIdsIncludes: ['27'],
      },
    },
  })

  const dispatch = useDispatch()

  const onClick = (file: string) => () => {
    dispatch(
      chooseSkin({
        type: 'playerChampion',
        champion: champion?.name || '',
        skin: data?.assets?.find((a) => a?.name === file),
      }),
    )
  }

  return (
    <div className='mb-4'>
      <p>Skins</p>
      <div className='h-40 overflow-y-auto'>
        {items.map((i) => (
          <div
            key={i.num}
            className='py-5 px-4 bg-cover'
            style={{ backgroundImage: `url(${i.src})` }}
            onClick={onClick(`skin${i.num}`)}
          >
            <span className='capitalize text-white'>{i.name}</span>
          </div>
        ))}
      </div>
      <p>Chromas</p>
      {Array.from(Array(19).keys())
        .filter((k) => !items?.some((i) => i.num === k))
        .map((num) => (
          <span key={num} className='mr-2' onClick={onClick(`skin${num}`)}>
            {num}
          </span>
        ))}
    </div>
  )
}

export default SkinSelect
