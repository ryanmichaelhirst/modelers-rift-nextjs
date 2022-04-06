import {
  SET_ANIMATIONS,
  SET_CURRENT_ANIMATION,
  SET_PLAY_ALL_ANIMATIONS,
  useAnimationResult,
} from '@customtypes/index'
import usePlayAnimation from '@hooks/use-play-animation'
import { OrbitControls, PerspectiveCamera, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { FC, Suspense, useEffect, useState } from 'react'
import { useAppContext } from '../context'
import { ModelGltf } from './model-gltf'
import { ModelLoader } from './model-loader'

export const ModelChampion: FC<{ canvasHeight?: number }> = ({ canvasHeight }) => {
  // React.useContext() does not work inside of suspense, so context is hoisted here
  const [{ selectedChampion, currentAnimation, playAllAnimations }, dispatch] = useAppContext()
  const [animationMixer, setAnimationMixer] = useState<useAnimationResult>()
  const [presignedUrl, setPresignedUrl] = useState<string>()

  useEffect(() => {
    const getData = async () => {
      setPresignedUrl(undefined)
      const skinNum = selectedChampion.skin || 'skin0'
      const champName = selectedChampion.basicInfo?.name?.toLowerCase().replace(' ', '') || 'aatrox'
      const url = await fetch(`/api/aws_presigned_url/${champName}-${skinNum}`).then((res) =>
        res.text(),
      )
      setPresignedUrl(url)
    }

    getData()
  }, [selectedChampion])

  const playAnimation = usePlayAnimation({
    mixer: animationMixer?.mixer,
    actions: animationMixer?.actions,
    names: animationMixer?.names,
  })

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

  const onSetAnimationMixer = (value: useAnimationResult) => setAnimationMixer(value)

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

  if (!presignedUrl) return null

  return (
    <Canvas>
      <Suspense fallback={<ModelLoader />}>
        <ModelGltf url={presignedUrl} onSetAnimationMixer={onSetAnimationMixer} />
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[300, 300, 200]} />
        <Preload />
      </Suspense>
    </Canvas>
  )
}
