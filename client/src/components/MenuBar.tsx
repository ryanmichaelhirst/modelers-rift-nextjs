import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BarChartIcon from '@mui/icons-material/BarChart'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

const options = [
  {
    Icon: AccountCircleIcon,
    text: 'Profile',
  },
  {
    Icon: ColorLensIcon,
    text: 'Animations',
  },
  {
    Icon: BarChartIcon,
    text: 'Compare',
  },
  {
    Icon: ViewModuleIcon,
    text: 'Item Builder',
  },
]

export const MenuBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='flex flex-row-reverse'>
      <IconButton
        onClick={handleClick}
        sx={{
          button: {
            outline: 'none !important',
          },
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map(({ Icon, text }) => (
          <MenuItem key={text} onClick={handleClose}>
            <div>
              <Icon />
              <span className='ml-3'>{text}</span>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
