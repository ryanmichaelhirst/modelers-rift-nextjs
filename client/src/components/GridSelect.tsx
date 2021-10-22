import { chooseChampion } from '@store/slices/championSlice'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const GridSelect = ({ items }: { items: any[] }) => {
  const [selected, setSelected] = useState<Record<string, any>>()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!selected && items) {
      const item = items[0]

      setSelected(item)
    }
  }, [items])

  const onClick = (item: Record<string, any>) => () => {
    dispatch(chooseChampion('playerChampion', { value: item.name }))
    setSelected(item)
  }

  return (
    <div
      className='grid grid-flow-row grid-cols-3 gap-0.5 overflow-y-auto h-96'
      style={{ transform: 'perspective(450px) rotateY(15deg)' }}
    >
      {items.map((i, idx) => {
        const active = i.name === selected?.name

        return (
          <div
            key={idx}
            className={classNames('bg-cover bg-center h-28 text-white', !active && 'opacity-70')}
            style={{
              backgroundImage: `url(${i.square_asset})`,
            }}
            onClick={onClick(i)}
          >
            <p>{i.name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default GridSelect
