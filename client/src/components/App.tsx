import SiteBackground from '@assets/site-bg.png'
import ChampionComparison from '@components/ChampionComparison'
import Header from '@components/Header'
import ChampionModelContainer from './ChampionModelContainer'

const App = () => (
  <div style={{ backgroundImage: `url(${SiteBackground})` }}>
    <Header />

    <div className='flex justify-center items-center'>
      <ChampionModelContainer />
    </div>

    <div className='m-5'>
      <ChampionComparison />
    </div>
  </div>
)

export default App
