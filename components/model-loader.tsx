import { CircularProgress } from '@mui/material'
import { Html, useProgress } from '@react-three/drei'

export const ModelLoader = () => {
  const { progress } = useProgress()
  console.log(progress)

  return (
    <Html center>
      <CircularProgress variant='determinate' value={progress} />
    </Html>
  )
}
