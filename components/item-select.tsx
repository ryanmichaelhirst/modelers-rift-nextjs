import Input from '@components/input'
import { Tooltip } from '@components/tooltip'
import { useAppContext } from '@context/index'
import { Item } from '@customtypes/index'
import classNames from 'classnames'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

export const ItemSelect = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const [{ lolItemsData }] = useAppContext()
  const { enqueueSnackbar } = useSnackbar()

  const onInput = (e: React.SyntheticEvent<Element, Event>, values: any[], reason: string) => {
    if (selectedItems.length === 6 && reason === 'selectOption') {
      enqueueSnackbar('You can only build 6 items. Remove one to add another', {
        variant: 'error',
        persist: false,
      })

      return
    }

    switch (reason) {
      case 'selectOption':
        setSelectedItems((prevState) => {
          return prevState.concat({} as Item)
        })
        break
      case 'removeOption':
        setSelectedItems((prevState) => {
          return prevState.filter((i) => i.name !== '')
        })
        break
      default:
        return
    }
  }

  const itemOptions = Object.values(lolItemsData).map((i) => ({
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
