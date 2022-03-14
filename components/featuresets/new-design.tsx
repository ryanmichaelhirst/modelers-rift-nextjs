import { ChampionModelContainer } from '@components/champion-model-container'
import InteractiveCard from '@components/interactive-card'

const NewDesign = () => {
  return (
    // <InteractiveCard />
    <div className='flex h-full'>
      <div className='w-1/3'>
        <InteractiveCard />
      </div>
      <div>
        <ChampionModelContainer />
      </div>
    </div>
  )
}

export default NewDesign
