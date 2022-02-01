import ChampionModelContainer from '@components/ChampionModelContainer'
import { GlassCard } from '@components/GlassCard'
import { SkinSelect } from '@components/SkinSelect'
import { Grid } from '@mui/material'
import { FC } from 'react'
import { lowercaseChampionNames } from '../../../bin/utils'
import { useCharacterQuery } from '../../../graphql/generated/types'
import { useAppContext } from '../context'

export const Home = () => {
  const [{ selectedChampion }, dispatch] = useAppContext()
  const { data, loading, error } = useCharacterQuery({
    variables: {
      filter: {
        nameEq: selectedChampion.basicInfo?.name?.toLowerCase(),
      },
      includeAssets: true,
    },
  })

  const sfx = data?.character?.assets?.filter((a) => a?.type === 'sfx')
  const vo = data?.character?.assets?.filter((a) => a?.type === 'vo')
  const models = data?.character?.assets?.filter((a) => a?.type === 'model')
  const analytics = [
    {
      text: 'models',
      total: models?.length,
    },
    {
      text: 'sound effects',
      total: sfx?.length,
    },
    {
      text: 'voice-overs',
      total: vo?.length,
    },
  ]
  const allInteractions =
    sfx
      ?.concat(vo)
      .filter((a) => lowercaseChampionNames.find((name) => a?.name?.includes(name)))
      .map((a) => {
        const name = lowercaseChampionNames.find((name) => a?.name?.includes(name))
        console.log(name)

        return name ?? ''
      }) ?? []
  const uniqueInteractions = Array.from(new Set(allInteractions))

  const GlassTitle: FC = ({ children }) => (
    <p className='text-2xl text-white font-nunito mb-4'>{children}</p>
  )

  return (
    <div className='min-h-screen mx-4'>
      <p className='mb-4 text-xl'>{selectedChampion.basicInfo?.name}</p>
      <Grid container spacing={2} className='min-h-screen'>
        <Grid container item direction='column' xs={4}>
          <Grid item xs={4}>
            <GlassTitle>Animations</GlassTitle>
            <GlassCard classes={'mb-4 text-white'}>
              <div>TODO</div>
              <div>TODO</div>
              <div>TODO</div>
              <div>TODO</div>
            </GlassCard>
          </Grid>

          <Grid item xs={4}>
            <GlassTitle>Analytics</GlassTitle>
            <GlassCard classes={'mb-4 text-white'}>
              {analytics.map((a) => (
                <div key={a.text} className='flex justify-around'>
                  <span>{Math.floor(a.total ?? 0)}+</span>
                  <span>{a.text}</span>
                </div>
              ))}
            </GlassCard>
          </Grid>
        </Grid>
        <Grid container item direction='column' xs={4} spacing={0}>
          <Grid item xs={3}>
            <ChampionModelContainer canvasHeight='300px' />
          </Grid>
          <Grid item xs={3}>
            <GlassCard>
              <SkinSelect />
            </GlassCard>
          </Grid>
        </Grid>
        <Grid container item direction='column' xs={4}>
          <Grid item xs={4}>
            <GlassTitle>SFX</GlassTitle>
            <GlassCard classes='overflow-y-scroll h-32 text-white'>
              {sfx?.map((s) => (
                <div>{s?.name}</div>
              ))}
            </GlassCard>
          </Grid>
          <Grid item xs={4}>
            <GlassTitle>VO</GlassTitle>
            <GlassCard classes='overflow-y-scroll h-32 text-white'>
              {vo?.map((v) => (
                <div>{v?.name}</div>
              ))}
            </GlassCard>
          </Grid>
          <Grid item xs={4}>
            <GlassTitle>Interactions</GlassTitle>
            <GlassCard classes='overflow-y-scroll h-32 text-white'>
              {uniqueInteractions?.map((champ) => (
                <div>{champ}</div>
              ))}
            </GlassCard>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
