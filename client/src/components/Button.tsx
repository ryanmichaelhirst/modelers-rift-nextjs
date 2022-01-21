import { Button as MuiButton } from '@mui/material'

export const Button: React.FC<{
  text: string
  onClick?: any
  classes?: {
    root?: string
    disabled?: string
    focusVisible?: string
  }
  variant?: 'text' | 'contained' | 'outlined'
}> = ({ text, onClick, classes, variant = 'text' }) => (
  <MuiButton classes={classes} variant={variant} onClick={onClick}>
    {text}
  </MuiButton>
)
