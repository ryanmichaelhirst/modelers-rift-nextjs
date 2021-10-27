import Input from '@components/Input'
import {
  addSelectedItem,
  removeSelectedItem,
  selectItems,
  selectSelectedItems,
} from '@store/slices/itemSlice'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'

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

export const ItemSelect = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectItems)
  const selectedItems = useSelector(selectSelectedItems)
  const { enqueueSnackbar } = useSnackbar()

  const onInput = (e: React.SyntheticEvent<Element, Event>, values: any[], reason: string) => {
    console.log({ reason, values })

    if (Object.keys(selectedItems).length === 6 && reason === 'selectOption') {
      enqueueSnackbar('You can only build 6 items. Remove one to add another', {
        variant: 'error',
        persist: false,
      })

      return
    }

    switch (reason) {
      case 'selectOption':
        dispatch(addSelectedItem(values))
        break
      case 'removeOption':
        dispatch(removeSelectedItem(values))
        break
      default:
        return
    }
  }

  const itemOptions = Object.values(items).map((i) => ({
    label: i.name,
    value: JSON.stringify(i),
    icon: `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/${i.image.full}`,
  }))

  console.log({ selectedItems })

  return (
    <div>
      <p>Choose your items</p>
      <div className='mt-4'>
        <Input
          multiple
          onChange={onInput}
          classes='mb-4'
          options={itemOptions.map((i) => i.label)}
          label='Select your items'
        />
      </div>
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
