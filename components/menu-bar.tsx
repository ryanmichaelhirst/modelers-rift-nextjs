import { Button } from '@components/button'
import { SearchBar } from '@components/search-bar'
import { Grid } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

export const MenuBar: FC = ({ children }) => {
  const router = useRouter()

  // TODO: need to trim the background image to correct mis-coloring at bottom left edge
  return (
    <div className='bg-no-repeat bg-cover' style={{ backgroundImage: 'url(/fuschia_swirl.jpg)' }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <div className='flex justify-between items-center px-4 py-5 h-full'>
            <div className='flex items-center'>
              <Image
                src={'/shen.svg'}
                width='56px'
                height='39px'
                className='cursor-pointer'
                onClick={() => router.push('/')}
              />
              <p
                className='text-black font-bruno text-xl mx-6 cursor-pointer'
                onClick={() => router.push('/')}
              >
                Modeler's Rift
              </p>
              <div>
                {['Dashboard', 'Interactive', 'Item Builder'].map((item) => (
                  <Button
                    onClick={() => router.push(`/${item.replace(' ', '_').toLowerCase()}`)}
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
      {children}
    </div>
  )
}
