import SiteBackground from '@assets/site-bg.png'
import ChampionComparison from '@components/ChampionComparison'
import GridSelect from '@components/GridSelect'
import Header from '@components/Header'
import { selectChampions } from '@store/slices/championSlice'
import { useSelector } from 'react-redux'
import ChampionModelContainer from './ChampionModelContainer'

const App = () => {
  const champions = useSelector(selectChampions)

  return (
    <div style={{ backgroundImage: `url(${SiteBackground})` }}>
      <Header />

      <div className='flex justify-center items-center py-20'>
        <GridSelect items={Object.values(champions).map((val) => ({ ...val }))} />
        <ChampionModelContainer />
      </div>

      <div className='m-5'>
        <ChampionComparison />
      </div>
    </div>
  )
}

export default App
