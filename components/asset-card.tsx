import type { Asset, Character } from '@customtypes/index'
import { FETCH_NEW_CHAMPION } from '@customtypes/index'
import { useRouter } from 'next/router'
import { useAppContext } from '../context'
import { Button } from './button'
import { Card } from './card'
import { Model } from './model'

export const AssetCard: React.FC<{ asset: Asset; character: Character }> = ({
  character,
  asset,
}) => {
  const [, dispatch] = useAppContext()
  const router = useRouter()

  const url = asset?.url

  const onExplore = () => {
    if (!character?.displayName) return

    dispatch({ type: FETCH_NEW_CHAMPION, payload: character.displayName })
    router.push('models')
  }

  return (
    <Card>
      <p className='text-tertiary font-nunito font-bold text-lg capitalize'>{character?.name}</p>
      <p>{asset?.name}</p>
      <div>{url ? <Model url={url} onSetModelConfig={() => {}} /> : null}</div>
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
