import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { selectItems, selectSelectedItems, setSelectedItems } from '../store/slices/itemSlice'
import { IconOption, SingleOption } from './ChampionSelect'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'

const ItemTooltip = ({ name, description }: { name: string; description: string }) => (
  <div>
    <p>{name}</p>
    <p>{description}</p>
  </div>
)

const ItemRow = ({ items, location }: { items: Record<string, any>[]; location: 't' | 'b' }) => (
  <>
    {items.map((item, ii) => (
      <Tippy
        key={item.name}
        content={<ItemTooltip name={item.name} description={item.description} />}
      >
        <img
          key={item.name}
          className={classNames(
            ii === 0 && `rounded-${location}l`,
            ii === items.length - 1 && `rounded-${location}r`,
            'inline-block',
          )}
          src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/${item.image.full}`}
          alt={item.name}
        />
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
      <div className='flex justify-center items-center'>
        <div className='flex flex-col shadow-2xl mt-4'>
          <div className=''>
            <ItemRow items={Object.values(selectedItems).slice(0, 3)} location='t' />
          </div>
          <div className=''>
            <ItemRow items={Object.values(selectedItems).slice(3, 6)} location='b' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemGrid
