import { Button as MuiButton } from '@mui/material'
import classNames from 'classnames'

export const Button: React.FC<{
  text: string
  onClick?: any
  classes?: {
    root?: string
    disabled?: string
    focusVisible?: string
  }
  variant?: 'text' | 'contained' | 'outlined'
  disabled?: boolean
  id?: string
}> = ({ text, onClick, classes, variant = 'text', disabled, id }) => (
  <MuiButton
    id={id}
    disabled={disabled}
    classes={{
      ...classes,
      root: classNames(classes?.root, 'text-xs md:text-base'),
    }}
    variant={variant}
    onClick={onClick}
  >
    {text}
  </MuiButton>
)
