import {
  Autocomplete,
  AutocompleteClasses,
  AutocompleteRenderOptionState,
  FilledInputClasses,
  InputClasses,
  InputLabelClasses,
  OutlinedInputClasses,
  Stack,
  TextField,
} from '@mui/material'
import classNames from 'classnames'
import React from 'react'

type InputMuiClasses = {
  autoComp?: Partial<AutocompleteClasses>
  textField?: Partial<OutlinedInputClasses> & Partial<FilledInputClasses> & Partial<InputClasses>
  label?: Partial<InputLabelClasses>
}

export const Input = ({
  value = null,
  options,
  label,
  classes,
  muiClasses,
  onChange,
  multiple,
  sx = {},
  variant = 'outlined',
  size = 'small',
  disableClearable = false,
  renderOption,
  isOptionEqualToValue,
}: {
  multiple?: boolean
  options: any[]
  label: string
  classes?: string
  muiClasses?: InputMuiClasses
  value?: string | null | string[]
  sx?: any
  size?: 'small' | 'medium'
  variant?: 'outlined' | 'filled' | 'standard'
  disableClearable?: boolean
  onChange: (e: React.SyntheticEvent<Element, Event>, value: any, reason: string) => void
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any,
    state: AutocompleteRenderOptionState,
  ) => React.ReactNode
  isOptionEqualToValue?: ((option: any, value: any) => boolean) | undefined
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
        renderOption={renderOption}
        isOptionEqualToValue={isOptionEqualToValue}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant={variant}
            InputProps={{
              ...params.InputProps,
              classes: {
                ...(muiClasses?.textField ?? {}),
              },
            }}
            InputLabelProps={{
              ...params.InputLabelProps,
              classes: {
                ...(muiClasses?.label ?? {}),
              },
            }}
          />
        )}
        classes={{
          ...(muiClasses?.autoComp ?? {}),
        }}
      />
    </Stack>
  )
}

export default Input
