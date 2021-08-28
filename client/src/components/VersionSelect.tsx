import React from 'react'
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { setSelectedVersion } from '../store/slices/championSlice'

const VersionSelect = ({ options, name, placeholder }: { name: string; placeholder: string; options: any[] }) => {
  const dispatch = useDispatch()

  const onSelect = (value: any) => dispatch(setSelectedVersion(value))

  return <Select options={options} onChange={onSelect} width='400px' placeholder={placeholder} />
}

export default VersionSelect
