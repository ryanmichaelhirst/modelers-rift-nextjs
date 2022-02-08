import {
  SET_ANIMATIONS,
  SET_CURRENT_ANIMATION,
  SET_PLAY_ALL_ANIMATIONS,
  useAnimationResult,
} from '@customtypes/index'
import usePlayAnimation from '@hooks/use-play-animation'
import { OrbitControls, PerspectiveCamera, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { FC, lazy, memo, Suspense, useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../context'

const ChampionModelContainer: FC<{ canvasHeight?: number; canvasWidth?: number }> = ({
  canvasHeight,
  canvasWidth,
}) => {
  const [{ selectedChampion, currentAnimation, playAllAnimations }, dispatch] = useAppContext()
  const [animationMixer, setAnimationMixer] = useState<useAnimationResult>()

  const playAnimation = usePlayAnimation({
    mixer: animationMixer?.mixer,
    actions: animationMixer?.actions,
    names: animationMixer?.names,
  })

  const skinNum = selectedChampion.skin || 'skin0'
  const champName = selectedChampion.basicInfo?.name?.toLowerCase().replace(' ', '') || 'aatrox'
  const glbUrl = `/api/getAwsObject/${champName}/${skinNum}`

  useEffect(() => {
    if (!animationMixer?.names) return

    dispatch({ type: SET_ANIMATIONS, payload: animationMixer.names })
    dispatch({ type: SET_CURRENT_ANIMATION })
    dispatch({ type: SET_PLAY_ALL_ANIMATIONS, payload: true })
  }, [animationMixer])

  useEffect(() => {
    if (!animationMixer?.mixer || !animationMixer.names) return

    dispatch({ type: SET_CURRENT_ANIMATION, payload: animationMixer.names[0] })
  }, [playAllAnimations, animationMixer])

  useEffect(() => {
    if (!currentAnimation) return

    // play the animation after we set it through dispatch
    animationMixer?.mixer.stopAllAction()
    playAnimation(currentAnimation)
  }, [currentAnimation])

  const onAnimationActionFinished = (e: THREE.Event) => {
    if (!animationMixer) return
    const { names, mixer } = animationMixer
    const curIdx = e ? names.indexOf(e?.action?.getClip()?.name) : 0
    let nextIdx = e ? curIdx + 1 : curIdx

    if (nextIdx >= names.length - 1) {
      nextIdx = 0
      mixer.setTime(0)
    }

    const nextAnimation = names[nextIdx]
    dispatch({ type: SET_CURRENT_ANIMATION, payload: nextAnimation })
  }

  useEffect(() => {
    if (!animationMixer?.mixer) return
    if (!playAllAnimations) {
      animationMixer.mixer.removeEventListener('finished', onAnimationActionFinished)

      return
    }

    animationMixer.mixer.addEventListener('finished', onAnimationActionFinished)

    return () => {
      animationMixer.mixer.removeEventListener('finished', onAnimationActionFinished)
    }
  }, [animationMixer, playAllAnimations])

  // dynamically import component
  const Component = useMemo(() => lazy(() => import(`./models/${champName}/${skinNum}.tsx`)), [
    champName,
    skinNum,
  ])

  const onSetAnimationMixer = (value: useAnimationResult) => {
    setAnimationMixer(value)
  }

  // React.useContext() does not work inside of suspense, so context is hoisted here
  const timerLabel = `${champName}-${skinNum}`

  return (
    <CanvasContainer
      canvasHeight={canvasHeight}
      glbUrl={glbUrl}
      timerLabel={timerLabel}
      component={Component}
      onSetAnimationMixer={onSetAnimationMixer}
    />
  )
}

const CanvasContainer: FC<{
  glbUrl: string
  timerLabel: string
  component: React.LazyExoticComponent<React.ComponentType<any>>
  onSetAnimationMixer: (value: useAnimationResult) => void
  canvasHeight?: number
}> = memo(
  ({ canvasHeight, glbUrl, timerLabel, onSetAnimationMixer, component: Component }) => {
    return (
      <Canvas style={{ ...(canvasHeight && { height: `${canvasHeight}px` }) }}>
        <Suspense fallback={null}>
          <Component
            key={timerLabel}
            timerLabel={timerLabel}
            glbUrl={glbUrl}
            onSetAnimationMixer={onSetAnimationMixer}
          />
          <OrbitControls />
          <PerspectiveCamera makeDefault position={[300, 300, 200]} />
          <Preload />
        </Suspense>
      </Canvas>
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.glbUrl === nextProps.glbUrl && prevProps.timerLabel === nextProps.timerLabel)
      return true

    return false
  },
)

export default ChampionModelContainer
