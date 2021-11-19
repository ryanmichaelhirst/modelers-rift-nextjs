import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const options = [
  {
    Icon: LoginIcon,
    text: 'Login',
  },
  {
    Icon: LogoutIcon,
    text: 'Logout',
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
    <>
      <Grid container spacing={0}>
        <Grid item xs={2} className='bg-gray-600'>
          <div className='flex items-center h-full px-3 py-2 border-l border-t border-white'>
            <p className='text-lg text-white'>League of Legends</p>
          </div>
        </Grid>
        <Grid item xs={10} className='bg-gray-600 border border-white'>
          <div className='flex justify-between items-center px-3 py-2'>
            <div className='flex text-white'>
              {['Dashboard', 'Animations', 'Item Builder'].map((item) => (
                <p className='mr-4 text-xl' key={item}>
                  {item}
                </p>
              ))}
            </div>
            <div>
              <IconButton
                onClick={handleClick}
                sx={{
                  button: {
                    outline: 'none !important',
                  },
                }}
              >
                <AccountCircleIcon style={{ color: 'white' }} />
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
          </div>
        </Grid>
      </Grid>
      <Outlet />
    </>
  )
}
