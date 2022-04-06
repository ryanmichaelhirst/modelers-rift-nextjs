import Image from 'next/image'
import { components } from 'react-select'

const { Option, SingleValue } = components

export const IconOption = (props: any) => {
  return (
    <Option {...props}>
      <Image src={props.data.icon} alt={props.data.label} className='w-7 h-7 inline-block mr-4' />
      <span>{props.data.label}</span>
    </Option>
  )
}

export const SingleOption = (props: any) => {
  return (
    <SingleValue {...props}>
      <Image src={props.data.icon} alt={props.data.label} className='w-7 h-7 inline-block mr-4' />
      <span>{props.data.label}</span>
    </SingleValue>
  )
}
