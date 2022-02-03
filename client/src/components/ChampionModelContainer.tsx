import { SET_ANIMATIONS, SET_SELECTED_ANIMATION } from '@customtypes/index'
import usePlayAnimation from '@hooks/use-play-animation'
import { OrbitControls, PerspectiveCamera, useAnimations, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { FC, lazy, Suspense, useCallback, useEffect, useRef } from 'react'
import { GLTF } from 'three-stdlib'
import { useAppContext } from '../context'

const ChampionModelContainer: FC<{ canvasHeight?: number; canvasWidth?: number }> = ({
  canvasHeight,
  canvasWidth,
}) => {
  const [{ selectedChampion, championAnimations }, dispatch] = useAppContext()
  const skinNum = selectedChampion.skin || 'skin0'
  const champName = selectedChampion.basicInfo?.name?.toLowerCase().replace(' ', '') || 'aatrox'
  const glbUrl = `/api/getAwsObject/${champName}/${skinNum}`

  const Component = lazy(() => import(`./models/${champName}/${skinNum}.tsx`))

  const onAnimationChange = useCallback((animation: string) => {
    dispatch({ type: SET_SELECTED_ANIMATION, payload: animation })
  }, [])

  const onAnimationsChange = useCallback((animations: string[]) => {
    dispatch({ type: SET_ANIMATIONS, payload: animations })
    dispatch({ type: SET_SELECTED_ANIMATION, payload: 'all' })
  }, [])

  // React.useContext() does not work inside of suspense, so context is hoisted here
  return (
    <Canvas style={{ ...(canvasHeight && { height: `${canvasHeight}px` }) }}>
      <Suspense fallback={null}>
        <ControlComponent
          glbUrl={glbUrl}
          skinNum={skinNum}
          champName={champName}
          selectedAnimation={championAnimations.selectedAnimation}
          component={Component}
          onAnimationsChange={onAnimationsChange}
          onAnimationChange={onAnimationChange}
        />
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[300, 300, 200]} />
      </Suspense>
    </Canvas>
  )
}

const ControlComponent: FC<{
  glbUrl: string
  skinNum: string
  champName: string
  selectedAnimation?: string
  component: React.LazyExoticComponent<React.ComponentType<any>>
  onAnimationsChange: (animations: string[]) => void
  onAnimationChange: (animation: string) => void
}> = ({
  glbUrl,
  skinNum,
  champName,
  selectedAnimation,
  component: Component,
  onAnimationsChange,
  onAnimationChange,
}) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef<THREE.Group>()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)
  const { playAnimation, cycleAnimations } = usePlayAnimation({
    name: selectedAnimation,
    actions,
    names,
    mixer,
    onAnimationChange,
  })
  const timerLabel = `${champName}-${skinNum}`

  useEffect(() => {
    if (selectedAnimation === 'all') cycleAnimations()
    if (selectedAnimation) playAnimation({ animationName: selectedAnimation })
  }, [selectedAnimation])

  useEffect(() => {
    onAnimationsChange(names)
  }, [names])

  return (
    <Component
      key={timerLabel}
      timerLabel={timerLabel}
      nodes={nodes}
      materials={materials}
      ref={ref}
    />
  )
}

export default ChampionModelContainer
