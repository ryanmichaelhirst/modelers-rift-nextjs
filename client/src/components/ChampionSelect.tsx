import { SelectOption } from '@customtypes/index'
import { chooseChampion } from '@store/slices/championSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Select, { components } from 'react-select'

const { Option, SingleValue } = components

export const IconOption = (props: any) => {
  return (
    <Option {...props}>
      <img src={props.data.icon} alt={props.data.label} className='w-7 h-7 inline-block mr-4' />
      <span>{props.data.label}</span>
    </Option>
  )
}

export const SingleOption = (props: any) => {
  return (
    <SingleValue {...props}>
      <img src={props.data.icon} alt={props.data.label} className='w-7 h-7 inline-block mr-4' />
      <span>{props.data.label}</span>
    </SingleValue>
  )
}

const ChampionSelect = ({
  value,
  options,
  name,
  placeholder,
}: {
  name: string
  placeholder: string
  options: any[]
  value: any
}) => {
  const dispatch = useDispatch()
  const [selectValue, setSelectValue] = useState<SelectOption>()

  useEffect(() => {
    const val = options.find((o) => o.label === value.name)

    if (val) setSelectValue(val)
  }, [value])

  const onSelect = (value: any) => dispatch(chooseChampion(name, value))

  return (
    <Select
      value={selectValue}
      components={{ Option: IconOption, SingleValue: SingleOption }}
      options={options}
      onChange={onSelect}
      width='400px'
      placeholder={placeholder}
    />
  )
}

export default ChampionSelect
