import type { Asset, Character } from '@customtypes/index'
import { CircularProgress } from '@mui/material'
import { OrbitControls, PerspectiveCamera, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { uriToUrl } from '@utils/index'
import { Suspense } from 'react'
import { Button } from './button'
import { Card } from './card'
import { ModelGltf } from './model-gltf'
import { ModelLoader } from './model-loader'

export const AssetCard: React.FC<{ asset: Asset; character: Character }> = ({
  character,
  asset,
}) => {
  const url = asset?.uri ? uriToUrl(asset.uri) : undefined
  console.log({ url })

  return (
    <Card>
      <p className='text-tertiary font-nunito font-bold text-lg capitalize'>{character?.name}</p>
      <p>{asset?.name}</p>
      <div className='w-[150px]'>
        {url ? (
          <Canvas>
            <Suspense fallback={<ModelLoader />}>
              <ModelGltf url={url} />
              <OrbitControls />
              <PerspectiveCamera makeDefault position={[300, 150, 200]} />
              <Preload />
            </Suspense>
          </Canvas>
        ) : (
          <CircularProgress />
        )}
      </div>
      <Button
        classes={{
          root: 'font-nunito text-primary',
        }}
        text='Explore'
      />
    </Card>
  )
}
