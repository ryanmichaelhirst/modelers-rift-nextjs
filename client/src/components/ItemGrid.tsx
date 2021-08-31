import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { selectItems, selectSelectedItems, setSelectedItems } from '../store/slices/itemSlice'
import { IconOption, SingleOption } from './ChampionSelect'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'

const ItemRow = ({ items, location }: { items: Record<string, any>[]; location: 't' | 'b' }) => (
  <>
    {items.map((item, ii) => (
      <Tippy key={item.name} content={item.name}>
        <div key={item.name}>
          <img
            className={classNames(
              ii === 0 && `rounded-${location}l`,
              ii === 3 && `rounded-${location}r`,
            )}
            src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/${item.image.full}`}
            alt={item.name}
          />
        </div>
      </Tippy>
    ))}
  </>
)

const ItemGrid = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectItems)
  const selectedItems = useSelector(selectSelectedItems)

  const onSelect = (value: any) => {
    const obj = JSON.parse(value.value)
    console.log(obj)
    const newItems = { ...selectedItems, [obj.name]: obj }
    dispatch(setSelectedItems(newItems))
  }

  const itemOptions = Object.values(items).map((i) => ({
    label: i.name,
    value: JSON.stringify(i),
    icon: `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/${i.image.full}`,
  }))

  return (
    <div className='mt-4'>
      <Select
        name='item-select'
        components={{ Option: IconOption, SingleValue: SingleOption }}
        options={itemOptions}
        onChange={onSelect}
        width='400px'
        placeholder={'Select an item'}
      />
      <div className='flex-1 flex-col items-center justify-center border rounded shadow mt-4'>
        <div className='flex'>
          <ItemRow items={Object.values(selectedItems).slice(0, 3)} location='t' />
        </div>
        <div className='flex'>
          <ItemRow items={Object.values(selectedItems).slice(3, 6)} location='b' />
        </div>
      </div>
    </div>
  )
}

export default ItemGrid
