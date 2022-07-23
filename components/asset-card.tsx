import type { Asset, Character } from '@customtypes/index'
import { FETCH_NEW_CHAMPION } from '@customtypes/index'
import { Preload, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { uriToUrl } from '@utils/index'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import { useAppContext } from '../context'
import { Button } from './button'
import { Card } from './card'
import { ModelGltf } from './model-gltf'
import { ModelLoader } from './model-loader'

export const AssetCard: React.FC<{ asset: Asset; character: Character }> = ({
  character,
  asset,
}) => {
  const [, dispatch] = useAppContext()
  const router = useRouter()

  const url = asset?.uri ? uriToUrl(asset.uri) : undefined

  const onExplore = () => {
    if (!character?.displayName) return

    dispatch({ type: FETCH_NEW_CHAMPION, payload: character.displayName })
    router.push('models')
  }

  return (
    <Card>
      <p className='text-tertiary font-nunito font-bold text-lg capitalize'>{character?.name}</p>
      <p>{asset?.name}</p>
      <div>
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
      <Button
        classes={{
          root: 'font-nunito text-primary',
        }}
        text='Explore'
        onClick={onExplore}
      />
    </Card>
  )
}
