import SiteBackground from '@assets/site-bg.png'
import ChampionComparison from '@components/ChampionComparison'
import GridSelect from '@components/GridSelect'
import Header from '@components/Header'
import { ItemSelect } from '@components/ItemSelect'
import { PatchSelect } from '@components/PatchSelect'
import { fetchPatches, selectChampions } from '@store/slices/championSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChampionModelContainer from './ChampionModelContainer'

const App = () => {
  const champions = useSelector(selectChampions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPatches())
  }, [])

  return (
    <div style={{ backgroundImage: `url(${SiteBackground})` }}>
      <Header />
      <PatchSelect />

      <div className='flex justify-around py-20'>
        <GridSelect items={Object.values(champions).map((val) => ({ ...val }))} />
        <ChampionModelContainer />
        <ItemSelect />
      </div>

      <div className='m-5'>
        <ChampionComparison />
      </div>
    </div>
  )
}

export default App

{
  /* <PatchSelect
options={patchOptions}
value={selectedPatch}
name='selectedPatch'
placeholder='Select patch'
/> */
}
