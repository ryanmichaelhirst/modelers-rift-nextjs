import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import classNames from 'classnames'
import React from 'react'

const Input = ({
  value = null,
  options,
  label,
  classes,
  onChange,
  multiple,
  sx = {},
  variant = 'outlined',
  size = 'small',
  disableClearable = false,
}: {
  multiple?: boolean
  options: any[]
  label: string
  classes?: string
  value?: string | null | string[]
  sx?: any
  size?: 'small' | 'medium'
  variant?: 'outlined' | 'filled' | 'standard'
  disableClearable?: boolean
  onChange: (e: React.SyntheticEvent<Element, Event>, value: any, reason: string) => void
}) => {
  return (
    <Stack spacing={2}>
      <Autocomplete
        size={size}
        limitTags={1}
        sx={sx}
        disableClearable={disableClearable}
        multiple={multiple}
        onChange={onChange}
        className={classNames(classes)}
        options={options}
        value={value}
        renderInput={(params) => (
          <TextField {...params} label={label} className='font-zen' variant={variant} />
        )}
        classes={{
          input: 'text-black',
        }}
      />
    </Stack>
  )
}

export default Input
