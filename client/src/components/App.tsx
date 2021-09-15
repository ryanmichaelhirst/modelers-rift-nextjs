import React from 'react'
import Header from './Header'
import ChampionComparison from './ChampionComparison'
// import ChampionModel from './ChampionModel'

const App = () => (
  <>
    <Header />
    <div className='m-5'>
      <ChampionComparison />
      {/* <ChampionModel /> */}
    </div>
  </>
)

export default App
