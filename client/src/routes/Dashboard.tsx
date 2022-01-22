import ChampionModelContainer from '@components/ChampionModelContainer'
import { Details } from '@components/Details'
import GridSelect from '@components/GridSelect'
import { Layout } from '@components/Layout'
import { PatchSelect } from '@components/PatchSelect'
import { FETCH_LOL_ITEMS } from '@customtypes/index'
import { useEffect } from 'react'
import { useAppContext } from '../context'

export const Dashboard = () => {
  const [{ selectedPatch, lolItemsData }, dispatch] = useAppContext()

  useEffect(() => {
    dispatch({ type: FETCH_LOL_ITEMS, payload: selectedPatch })
  }, [])

  return (
    <Layout>
      <div className='h-screen'>
        <PatchSelect />

        <div className='grid grid-cols-3 grid-rows-1 gap-2 relative m-10'>
          <GridSelect />
          <ChampionModelContainer />
          <Details />
        </div>
      </div>
    </Layout>
  )
}
