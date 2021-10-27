import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import classNames from 'classnames'
import React from 'react'

const Input = ({
  value,
  options,
  label,
  classes = '',
  onChange,
  multiple,
}: {
  multiple?: boolean
  options: any[]
  label: string
  classes?: string
  value?: string
  onChange: (e: React.SyntheticEvent<Element, Event>, value: any, reason: string) => void
}) => {
  return (
    <Stack spacing={2}>
      <Autocomplete
        multiple={multiple}
        onChange={onChange}
        className={classNames(classes)}
        options={options}
        value={value}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  )
}

export default Input
