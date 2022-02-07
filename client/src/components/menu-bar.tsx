// @ts-ignore
import Shen from '@assets/shen.svg?component'
import { Button } from '@components/Button'
import { SearchBar } from '@components/search-bar'
import { Grid } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'

export const MenuBar = () => {
  const navigate = useNavigate()

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div className='flex justify-between items-center px-4 py-5 h-full'>
            <div className='flex items-center'>
              {/* TODO: convert this react-component */}
              <Shen className='cursor-pointer' onClick={() => navigate('/')} />
              <p
                className='text-black font-bruno text-xl mx-6 cursor-pointer'
                onClick={() => navigate('/')}
              >
                Modeler's Rift
              </p>
              <div>
                {['Dashboard', 'Interactive', 'Item Builder'].map((item) => (
                  <Button
                    onClick={() => navigate(`/${item.replace(' ', '_').toLowerCase()}`)}
                    key={item}
                    classes={{
                      root:
                        'mr-6 bg-gum-300 text-gum-200 px-4 py-2 font-nunito capitalize font-bold text-white text-lg rounded-full',
                    }}
                    text={item}
                  />
                ))}
              </div>
            </div>

            <div className='flex text-white items-center'>
              <Button
                classes={{
                  root: 'font-nunito font-bold text-white bg-gum-400 px-7 py-2 rounded-xl',
                }}
                text={'Support on Patreon'}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
      </Grid>
      <Outlet />
    </>
  )
}
