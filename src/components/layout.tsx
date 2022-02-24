import { Sidebar } from '@components/sidebar'
import { Grid } from '@mui/material'
import { FC } from 'react'

export const Layout: FC<{}> = ({ children }) => (
  <Grid container spacing={0} className='h-screen'>
    <Grid item xs={2}>
      <Sidebar />
    </Grid>
    <Grid item xs={10}>
      {children}
    </Grid>
  </Grid>
)
