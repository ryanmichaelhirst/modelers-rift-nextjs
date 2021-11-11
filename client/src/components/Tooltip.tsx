import { Tooltip as MuiTooltip } from '@mui/material'
import { FC } from 'react'

export const Tooltip: FC<{ title: string }> = ({ children, title }) => (
  <MuiTooltip title={title}>
    <div>{children}</div>
  </MuiTooltip>
)
