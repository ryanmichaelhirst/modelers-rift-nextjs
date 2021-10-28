import { Details } from '@components/Details'
import GridSelect from '@components/GridSelect'
import Header from '@components/Header'
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
    <div className='overflow-hidden relative'>
      <img
        className='opacity-80 absolute left-0 top-0 h-full w-full'
        src='https://media.istockphoto.com/videos/4k-abstract-particle-wave-bokeh-background-blue-water-snow-beautiful-video-id1199496434?b=1&k=20&m=1199496434&s=640x640&h=uoWw2DWlWO-EqtWuvG-vmFgFh-mOKox8LE1LbqFLpw0='
      />
      <Header />
      <PatchSelect />

      <div className='grid grid-cols-3 grid-rows-1 gap-2 py-20 relative'>
        <GridSelect items={Object.values(champions).map((val) => ({ ...val }))} />
        <ChampionModelContainer />
        <Details />
      </div>

      {/* <div className='m-5'>
        <ChampionComparison />
      </div> */}
    </div>
  )
}

export default App
