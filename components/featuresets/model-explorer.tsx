import { ChampionModel } from '@components/champion-model'
import InteractiveCard from '@components/interactive-card'

export const ModelExplorer = () => {
  return (
    <div className='flex h-full'>
      <div className='w-1/3'>
        <InteractiveCard />
      </div>
      <div className='flex-auto'>
        <ChampionModel />
      </div>
    </div>
  )
}
