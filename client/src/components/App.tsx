import React from 'react'
import Header from './Header'
import ChampionComparison from '@components/ChampionComparison'
import ChampionModel from '@components/ChampionModel'

const App = () => (
  <>
    <div className='flex'>
      <ChampionModel champion='aatrox' />
      <ChampionModel champion='akali' />
    </div>

    <Header />
    <div className='m-5'>
      <ChampionComparison />
    </div>
  </>
)

export default App
