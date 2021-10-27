import { chooseSkin, selectPlayerChampion } from '@store/slices/championSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SkinSelect = ({ items }: { items: any[] }) => {
  const champion = useSelector(selectPlayerChampion)
  const [selected, setSelected] = useState<Record<string, any>>()
  const dispatch = useDispatch()

  const onClick = (file: string) => () => {
    dispatch(chooseSkin({ type: 'playerChampion', champion: champion?.name || '', file }))
  }

  return (
    <div className='mb-4'>
      <p>SkinSelect</p>
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
    </div>
  )
}

export default SkinSelect
