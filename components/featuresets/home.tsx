import { ChampionModelContainer } from '@components/champion-model-container'
import InteractiveCard from '@components/interactive-card'

const Home = () => {
  return (
    <div className='flex h-full'>
      <div className='w-1/3'>
        <InteractiveCard />
      </div>
      <div className='flex-auto'>
        <ChampionModelContainer />
      </div>
    </div>
  )
}

export default Home
