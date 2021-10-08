import { SelectOption } from '@customtypes/index'
import { setSelectedStat } from '@store/slices/championSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import Select from 'react-select'

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
