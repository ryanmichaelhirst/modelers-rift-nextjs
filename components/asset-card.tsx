import type { Asset } from '@customtypes/index'
import { OrbitControls, PerspectiveCamera, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Button } from './button'
import { Card } from './card'
import { ModelGltf } from './model-gltf'
import { ModelLoader } from './model-loader'

export const AssetCard = ({ url, asset }: { url?: string | null; asset: Asset }) => {
  if (!url) return null

  return (
    <Card classes='flex-none'>
      <p className='text-tertiary font-nunito font-bold text-lg capitalize'>
        {asset?.character?.name}
      </p>
      <p>{asset?.character?.name}</p>
      <div className='w-[150px]'>
        <Canvas>
          <Suspense fallback={<ModelLoader />}>
            <ModelGltf url={url} />
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
