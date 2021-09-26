import React from 'react'
import Header from '@components/Header'
import ChampionComparison from '@components/ChampionComparison'
import SiteBackground from '@assets/site-bg.png'
import ChampionModelContainer from './ChampionModelContainer'

const App = () => (
  <div style={{ backgroundImage: `url(${SiteBackground})` }}>
    <Header />

    <div className='flex justify-center items-center'>
      <ChampionModelContainer name='aatrox' />
    </div>

    <div className='m-5'>
      <ChampionComparison />
    </div>
  </div>
)

export default App
