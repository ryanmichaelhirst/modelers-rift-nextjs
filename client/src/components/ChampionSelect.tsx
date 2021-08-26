import React from 'react'
import Select from 'react-select'

const ChampionSelect = ({
  options,
  onChange,
  name,
  placeholder,
}: {
  name: string
  placeholder: string
  options: any[]
  onChange: (name: string, value: Record<string, string>) => void
}) => {
  return <Select options={options} onChange={(val) => onChange(name, val)} width='400px' placeholder={placeholder} />
}

export default ChampionSelect
