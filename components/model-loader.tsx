import { Html, useProgress } from '@react-three/drei'

export const ModelLoader = () => {
  const { progress } = useProgress()
  return <Html center>{progress}% loaded</Html>
}
