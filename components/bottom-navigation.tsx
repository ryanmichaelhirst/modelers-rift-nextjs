import { BarChartOutlined, HeadphonesOutlined, VideocamOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import classNames from 'classnames'
import { FC, MouseEventHandler } from 'react'

const icons = [
  {
    Icon: HeadphonesOutlined,
    value: 'audio',
  },
  {
    Icon: VideocamOutlined,
    value: 'animation',
  },
  {
    Icon: BarChartOutlined,
    value: 'analytic',
  },
]

export const BottomNavigation: FC<{
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
  selectedIcon?: string
}> = ({ onClick, selectedIcon }) => {
  return (
    <>
      {icons.map(({ Icon, value }) => (
        <IconButton
          key={value}
          className={classNames(
            selectedIcon === value && 'bg-sunset-900 text-white hover:bg-sunset-900',
            'mr-4',
          )}
          value={value}
          onClick={onClick}
          size='small'
        >
          <Icon />
        </IconButton>
      ))}
    </>
  )
}
