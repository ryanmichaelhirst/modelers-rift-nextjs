import Input from '@components/Input'
import { Tooltip } from '@components/Tooltip'
import {
  addSelectedItem,
  removeSelectedItem,
  selectItems,
  selectSelectedItems,
} from '@store/slices/itemSlice'
import classNames from 'classnames'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'

export const ItemSelect = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectItems)
  const selectedItems = useSelector(selectSelectedItems)
  const { enqueueSnackbar } = useSnackbar()

  const onInput = (e: React.SyntheticEvent<Element, Event>, values: any[], reason: string) => {
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

  const selItems = Object.values(selectedItems)

  return (
    <>
      <div className='mt-4'>
        <Input
          disableClearable
          multiple
          value={Object.keys(selectedItems).map((key) => key)}
          onChange={onInput}
          classes='mb-4'
          options={itemOptions.map((i) => i.label)}
          label='Select your items'
        />
      </div>
      <div className='flex flex-wrap'>
        {selItems.map((item, ii) => (
          <Tooltip key={item.name} title={item.description}>
            <img
              key={item.name}
              className={classNames('h-10')}
              src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/${item.image.full}`}
              alt={item.name}
            />
          </Tooltip>
        ))}
      </div>
    </>
  )
}
