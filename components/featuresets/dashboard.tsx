import { AnimationPlayer } from '@components/animation-player'
import { AudioPlayer } from '@components/audio-player'
import ChampionModelContainer from '@components/champion-model-container'
import { GlassCard, GlassTitle } from '@components/glass-card'
import { SkinCarousel } from '@components/skin-carousel'
import { useAppContext } from '@context/index'
import { useCharacterQuery } from '@graphql/generated/types'
import {
  BarChartOutlined,
  PaletteOutlined,
  QueueMusicOutlined,
  VideocamOutlined,
} from '@mui/icons-material'
import { Grid } from '@mui/material'
import { lowercaseChampionNames } from '@utils/index'
import { useEffect } from 'react'

export const Home = () => {
  const [{ selectedChampion, currentAnimation, animations }, dispatch] = useAppContext()
  const { data, loading: characterLoading, error } = useCharacterQuery({
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
  const allInteractions =
    sfx
      ?.concat(vo)
      .filter((a) => lowercaseChampionNames.find((name) => a?.name?.includes(name)))
      .map((a) => {
        const name = lowercaseChampionNames.find((name) => a?.name?.includes(name))

        return name ?? ''
      }) ?? []
  const uniqueInteractions = Array.from(new Set(allInteractions))
  const analytics = [
    {
      text: 'models',
      total: models?.length,
    },
    {
      text: 'voice-overs',
      total: vo?.length,
    },
    {
      text: 'sound effects',
      total: sfx?.length,
    },
    {
      text: 'interactions',
      total: uniqueInteractions.length,
    },
  ]

  useEffect(() => {
    if (!currentAnimation) return

    const el = window.document.getElementById(currentAnimation)
    // prevents whole page from scrolling
    // https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move/11041376
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }, [currentAnimation])

  return (
    <div className='min-h-screen mx-4'>
      <Grid container spacing={2} className='min-h-screen'>
        <Grid container item direction='column' xs={5} rowSpacing={8}>
          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <GlassTitle>
                <VideocamOutlined fontSize='medium' />
                <span className='ml-3'>Animations</span>
              </GlassTitle>
              <AnimationPlayer />
            </Grid>
            <Grid item xs={6}>
              <GlassTitle>
                <QueueMusicOutlined fontSize='medium' />
                <span className='ml-4'>SFX / VO</span>
              </GlassTitle>
              <AudioPlayer />
            </Grid>
          </Grid>

          <Grid container item>
            <Grid item xs={12}>
              <GlassTitle>
                <PaletteOutlined fontSize='medium' />
                <span className='ml-4'>Models</span>
              </GlassTitle>
              <GlassCard>
                <SkinCarousel />
              </GlassCard>
            </Grid>
          </Grid>

          <Grid container item spacing={2}>
            <Grid item xs={12}>
              <GlassTitle>
                <BarChartOutlined fontSize='medium' />
                <span className='ml-4'>Analytics</span>
              </GlassTitle>
              <GlassCard classes={'mb-4 text-white font-nunito'}>
                <div className='flex justify-evenly items-center'>
                  {analytics
                    .filter((a) => a.total)
                    .map((a) => (
                      <div key={a.text} className='text-center font-bold'>
                        <p>{Math.floor((a.total ?? 0) / 10) * 10}+</p>
                        <p className='capitalize'>{a.text}</p>
                      </div>
                    ))}
                </div>
              </GlassCard>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item xs={7}>
          <Grid item xs={12}>
            <ChampionModelContainer />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
