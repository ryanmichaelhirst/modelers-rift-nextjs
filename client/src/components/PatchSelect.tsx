import React from 'react'
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { setSelectedPatch } from '../store/slices/championSlice'
import { SelectOption } from '../types'

const PatchSelect = ({
  options,
  name,
  placeholder,
}: {
  name: string
  placeholder: string
  options: SelectOption[]
}) => {
  const dispatch = useDispatch()

  const onSelect = (value: SelectOption) => dispatch(setSelectedPatch(value))

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

export default PatchSelect
