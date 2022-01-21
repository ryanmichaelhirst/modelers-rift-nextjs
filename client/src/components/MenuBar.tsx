import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useJobsIndexQuery } from '../../../graphql/generated/types'
import { Button } from './Button'

const userOptions = [
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
  const [menus, setMenus] = useState({
    user: null,
    job: null,
  })
  const navigate = useNavigate()

  const { data, error, loading } = useJobsIndexQuery()

  const handleClick = (name: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget

    setMenus((prev) => ({
      ...prev,
      [name]: event.currentTarget,
    }))
  }

  const handleClose = (name: string) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMenus((prev) => ({
      ...prev,
      [name]: null,
    }))
  }

  const userMenuOpen = Boolean(menus.user)
  const jobMenuOpen = Boolean(menus.job)

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={2} className='bg-space-700'>
          <div className='flex items-center h-full px-3 py-2 border-l border-t border-white'>
            <p className='text-lg text-white'>League of Legends</p>
          </div>
        </Grid>
        <Grid item xs={10} className='bg-space-800 border border-white'>
          <div className='flex justify-between items-center px-3 py-2 h-full'>
            <div className='flex text-white'>
              {['Dashboard', 'Interactive', 'Item Builder'].map((item) => (
                <Button
                  onClick={() => navigate(`/${item.replace(' ', '_').toLowerCase()}`)}
                  key={item}
                  classes={{
                    root: 'mr-2',
                  }}
                  text={item}
                />
              ))}
            </div>
            <div className='flex text-white items-center'>
              <Button
                classes={{
                  root: 'mr-1',
                }}
                text='Jobs'
                onClick={handleClick('job')}
              />
              <Menu anchorEl={menus.job} open={jobMenuOpen} onClose={handleClose('job')}>
                {data?.jobs?.map((j) => (
                  <MenuItem key={j?.name} onClick={handleClose('job')}>
                    <div>
                      <span className='ml-3'>{j?.name}</span>
                    </div>
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                onClick={handleClick('user')}
                sx={{
                  button: {
                    outline: 'none !important',
                  },
                }}
              >
                <AccountCircleIcon style={{ color: 'white' }} />
              </IconButton>
              <Menu anchorEl={menus.user} open={userMenuOpen} onClose={handleClose('user')}>
                {userOptions.map(({ Icon, text }) => (
                  <MenuItem key={text} onClick={handleClose('user')}>
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
