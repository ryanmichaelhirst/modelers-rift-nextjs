import { ChampionModelContainer } from '@components/champion-model-container'
import InteractiveCard from '@components/interactive-card'
import { Grid } from '@mui/material'

const NewDesign = () => {
  return (
    <Grid container spacing={2} className='h-full'>
      <Grid item xs={5}>
        <InteractiveCard />
      </Grid>
      <Grid container item xs={7}>
        <Grid item xs={12}>
          <ChampionModelContainer />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NewDesign
