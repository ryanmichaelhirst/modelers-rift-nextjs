import Shen from '@assets/shen.svg?component'
import { ListAlt } from '@mui/icons-material'
import { Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useJobsIndexQuery } from '../../../graphql/generated/types'
import { Button } from './Button'

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
        <Grid item xs={12} className=' dark:bg-space-800 border dark:border-white'>
          <div className='flex justify-between items-center px-3 py-2 h-full'>
            <Shen />
            <p className='text-black font-bruno'>Modeler's Rift</p>
            <div className='flex text-white'>
              {['Dashboard', 'Interactive', 'Item Builder'].map((item) => (
                <Button
                  onClick={() => navigate(`/${item.replace(' ', '_').toLowerCase()}`)}
                  key={item}
                  classes={{
                    root: 'mr-6 bg-gum-300 text-gum-200 px-2 font-nunito capitalize font-bold',
                  }}
                  text={item}
                />
              ))}
            </div>
            <div className='flex text-white items-center'>
              <IconButton
                onClick={handleClick('job')}
                sx={{
                  button: {
                    outline: 'none !important',
                  },
                }}
              >
                <ListAlt style={{ color: 'white' }} />
              </IconButton>
              <Menu anchorEl={menus.job} open={jobMenuOpen} onClose={handleClose('job')}>
                {data?.jobs?.map((j) => (
                  <MenuItem key={j?.name} onClick={handleClose('job')}>
                    <div>
                      <span className='ml-3'>{j?.name}</span>
                    </div>
                  </MenuItem>
                ))}
              </Menu>
              <Button
                classes={{
                  root: 'font-nunito font-bold text-white bg-gum-400',
                }}
                text={'Support on Patreon'}
              />
            </div>
          </div>
        </Grid>
      </Grid>
      <Outlet />
    </>
  )
}
