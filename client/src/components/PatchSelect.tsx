import { SelectOption } from '@customtypes/index'
import { setSelectedPatch } from '@store/slices/championSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Select from 'react-select'

const PatchSelect = ({
  options,
  name,
  value,
  placeholder,
}: {
  name: string
  value: any
  placeholder: string
  options: SelectOption[]
}) => {
  const dispatch = useDispatch()
  const [selectValue, setSelectValue] = useState<SelectOption>()

  useEffect(() => {
    const val = options.find((o) => o.value === value)

    if (val) setSelectValue(val)
  }, [value])

  const onSelect = (value: SelectOption) => dispatch(setSelectedPatch(value))

  return (
    <Select
      name={name}
      value={selectValue}
      options={options}
      onChange={onSelect}
      width='400px'
      placeholder={placeholder}
    />
  )
}

export default PatchSelect
