import { AnimationPlayer } from '@components/animation-player'
import { AudioPlayer } from '@components/audio-player'
import ChampionModelContainer from '@components/ChampionModelContainer'
import { GlassCard } from '@components/GlassCard'
import { SkinSelect } from '@components/SkinSelect'
import { BarChartOutlined, QueueMusicOutlined, VideocamOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { FC, useEffect } from 'react'
import { lowercaseChampionNames } from '../../../bin/utils'
import { useCharacterQuery } from '../../../graphql/generated/types'
import { useAppContext } from '../context'

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
  ]
  const allInteractions =
    sfx
      ?.concat(vo)
      .filter((a) => lowercaseChampionNames.find((name) => a?.name?.includes(name)))
      .map((a) => {
        const name = lowercaseChampionNames.find((name) => a?.name?.includes(name))

        return name ?? ''
      }) ?? []
  const uniqueInteractions = Array.from(new Set(allInteractions))

  const GlassTitle: FC = ({ children }) => (
    <div className='flex items-center text-2xl text-white font-nunito mb-4'>{children}</div>
  )

  useEffect(() => {
    if (!currentAnimation) return

    const el = window.document.getElementById(currentAnimation)
    // prevents whole page from scrolling
    // https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move/11041376
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }, [currentAnimation])

  return (
    <div className='min-h-screen mx-4'>
      <p className='mb-4 text-xl'>{selectedChampion.basicInfo?.name}</p>
      <Grid container spacing={2} className='min-h-screen'>
        <Grid container item direction='column' xs={4}>
          <Grid item xs={4}>
            <GlassTitle>
              <VideocamOutlined fontSize='medium' />
              <span className='ml-3'>Animations</span>
            </GlassTitle>
            <AnimationPlayer />
          </Grid>

          <Grid item xs={4}>
            <GlassTitle>
              <QueueMusicOutlined fontSize='medium' />
              <span className='ml-4'>SFX / VO</span>
            </GlassTitle>
            <AudioPlayer sounds={sfx?.concat(vo ?? [])} />
          </Grid>

          <Grid item xs={4}>
            <GlassTitle>
              <BarChartOutlined fontSize='medium' />
              <span className='ml-4'>Analytics</span>
            </GlassTitle>
            <GlassCard classes={'mb-4 text-white'}>
              <div className='grid grid-flow-col auto-cols-max justify-evenly text-lg font-nunito'>
                <div>
                  {analytics
                    .filter((a) => a.total)
                    .map((a) => (
                      <div key={a.total} className='font-bold'>
                        {Math.floor((a.total ?? 0) / 10) * 10}+
                      </div>
                    ))}
                </div>
                <div>
                  {analytics.map((a) => (
                    <div key={a.text}>{a.text}</div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Grid>
        </Grid>

        <Grid container item direction='column' xs={8} spacing={0}>
          <Grid item xs={6}>
            <ChampionModelContainer />
          </Grid>

          <Grid item xs={6}>
            <GlassCard>
              <SkinSelect />
            </GlassCard>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
