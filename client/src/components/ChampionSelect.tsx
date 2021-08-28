import React from 'react'
import Select, { components } from 'react-select'
import { useDispatch } from 'react-redux'
import { chooseChampion } from '../store/slices/championSlice'
const { Option, SingleValue } = components

const IconOption = (props: any) => {
  return (
    <Option {...props}>
      <img src={props.data.icon} alt={props.data.label} className='w-7 h-7 inline-block mr-4' />
      <span>{props.data.label}</span>
    </Option>
  )
}

const SingleOption = (props: any) => {
  return (
    <SingleValue {...props}>
      <img src={props.data.icon} alt={props.data.label} className='w-7 h-7 inline-block mr-4' />
      <span>{props.data.label}</span>
    </SingleValue>
  )
}

const ChampionSelect = ({ options, name, placeholder }: { name: string; placeholder: string; options: any[] }) => {
  const dispatch = useDispatch()

  const onSelect = (value: any) => dispatch(chooseChampion(name, value))

  return (
    <Select
      components={{ Option: IconOption, SingleValue: SingleOption }}
      options={options}
      onChange={onSelect}
      width='400px'
      placeholder={placeholder}
    />
  )
}

export default ChampionSelect
