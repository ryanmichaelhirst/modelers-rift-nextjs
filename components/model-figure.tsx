import type { Asset, Character } from '@customtypes/index'
import { Preload, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { uriToUrl } from '@utils/index'
import { Suspense } from 'react'
import { ModelGltf } from './model-gltf'
import { ModelLoader } from './model-loader'

export const ModelFigure: React.FC<{ asset: Asset; character: Character }> = ({
  character,
  asset,
}) => {
  const url = asset?.uri ? uriToUrl(asset.uri) : undefined

  return (
    <div>
      <p className='text-tertiary font-nunito font-bold text-lg capitalize'>{character?.name}</p>
      <p>{asset?.name}</p>
      <div className='w-[150px]'>
        {url ? (
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={<ModelLoader />}>
              <Stage>
                <ModelGltf url={url} />
              </Stage>
              <Preload />
            </Suspense>
          </Canvas>
        ) : null}
      </div>
    </div>
  )
}
