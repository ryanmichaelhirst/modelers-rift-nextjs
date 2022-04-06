import InteractiveCard from '@components/interactive-card'
import { ModelChampion } from '@components/model-champion'

export const ModelExplorer = () => {
  return (
    <div className='flex h-full'>
      <div className='w-1/3'>
        <InteractiveCard />
      </div>
      <div className='flex-auto'>
        <ModelChampion />
      </div>
    </div>
  )
}
