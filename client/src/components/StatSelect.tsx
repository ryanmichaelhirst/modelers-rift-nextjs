import React from 'react'
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { setSelectedStat } from '@store/slices/championSlice'
import { SelectOption } from '@customtypes/index'

const StatSelect = ({
  options,
  name,
  placeholder,
}: {
  name: string
  placeholder: string
  options: SelectOption[]
}) => {
  const dispatch = useDispatch()

  const onSelect = (value: SelectOption) => dispatch(setSelectedStat(value))

  return (
    <Select
      name={name}
      options={options}
      onChange={onSelect}
      width='400px'
      placeholder={placeholder}
    />
  )
}

export default StatSelect
