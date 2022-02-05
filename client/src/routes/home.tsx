import ChampionModelContainer from '@components/ChampionModelContainer'
import { GlassCard } from '@components/GlassCard'
import { SkinSelect } from '@components/SkinSelect'
import { SoundList } from '@components/sound-list'
import { SET_PLAY_ALL_ANIMATIONS, SET_SELECTED_ANIMATION } from '@customtypes/index'
import { Grid } from '@mui/material'
import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { lowercaseChampionNames } from '../../../bin/utils'
import { useCharacterQuery } from '../../../graphql/generated/types'
import { useAppContext } from '../context'

export const Home = () => {
  const [{ selectedChampion, championAnimations }, dispatch] = useAppContext()
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
    <p className='text-2xl text-white font-nunito mb-4'>{children}</p>
  )

  const onAnimationClick = (animation: string) => () => {
    dispatch({ type: SET_SELECTED_ANIMATION, payload: animation })
    dispatch({ type: SET_PLAY_ALL_ANIMATIONS, payload: false })
  }

  useEffect(() => {
    if (!championAnimations.selectedAnimation) return

    const el = window.document.getElementById(championAnimations.selectedAnimation)
    // prevents whole page from scrolling
    // https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move/11041376
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }, [championAnimations.selectedAnimation])

  return (
    <div className='min-h-screen mx-4'>
      <p className='mb-4 text-xl'>{selectedChampion.basicInfo?.name}</p>
      <Grid container spacing={2} className='min-h-screen'>
        <Grid container item direction='column' xs={4}>
          <Grid item xs={4}>
            <GlassTitle>Animations</GlassTitle>
            <GlassCard classes={'mb-4 text-white overflow-y-scroll h-32'}>
              {championAnimations.animations?.map((a) => (
                <div
                  key={a}
                  id={a}
                  className={classNames(
                    a === championAnimations.selectedAnimation && 'text-blue-500',
                  )}
                  onClick={onAnimationClick(a)}
                >
                  {a}
                </div>
              ))}
            </GlassCard>
          </Grid>

          <Grid item xs={4}>
            <GlassTitle>Analytics</GlassTitle>
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
        <Grid container item direction='column' xs={4} spacing={0}>
          <Grid item xs={4}>
            <ChampionModelContainer canvasHeight={400} canvasWidth={300} />
          </Grid>
          <Grid item xs={4}>
            <GlassCard>
              <SkinSelect />
            </GlassCard>
          </Grid>
        </Grid>
        <Grid container item direction='column' xs={4}>
          <Grid item xs={4}>
            <GlassTitle>SFX</GlassTitle>
            <GlassCard classes='overflow-y-scroll h-32 text-white'>
              <SoundList options={sfx} />
            </GlassCard>
          </Grid>
          <Grid item xs={4}>
            <GlassTitle>VO</GlassTitle>
            <GlassCard classes='overflow-y-scroll h-32 text-white'>
              <SoundList options={vo} />
            </GlassCard>
          </Grid>
          <Grid item xs={4}>
            <GlassTitle>Interactions</GlassTitle>
            <GlassCard classes='overflow-y-scroll h-32 text-white'>
              {uniqueInteractions?.map((champ) => (
                <div key={champ}>{champ}</div>
              ))}
            </GlassCard>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
