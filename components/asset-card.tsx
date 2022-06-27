import type { Asset, Character } from '@customtypes/index'
import { OrbitControls, PerspectiveCamera, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Button } from './button'
import { Card } from './card'
import { ModelGltf } from './model-gltf'
import { ModelLoader } from './model-loader'

export const AssetCard: React.FC<{ asset: Asset; character: Character }> = ({
  character,
  asset,
}) => {
  if (!asset?.url) return null

  return (
    <Card classes='flex-none'>
      <p className='text-tertiary font-nunito font-bold text-lg capitalize'>{character?.name}</p>
      <p>{asset?.name}</p>
      <div className='w-[150px]'>
        <Canvas>
          <Suspense fallback={<ModelLoader />}>
            <ModelGltf url={asset.url} />
            <OrbitControls />
            <PerspectiveCamera makeDefault position={[300, 150, 200]} />
            <Preload />
          </Suspense>
        </Canvas>
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
