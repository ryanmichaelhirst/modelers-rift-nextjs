import ChampionModelContainer from '@components/ChampionModelContainer'
import { Details } from '@components/Details'
import GridSelect from '@components/GridSelect'
import { Layout } from '@components/Layout'
import { PatchSelect } from '@components/PatchSelect'
import { useEffect } from 'react'
import { SET_LOL_ITEMS_DATA, useAppContext } from '../context'
import { getItems } from '../utils'

export const Dashboard = () => {
  const [{ selectedPatch, lolItemsData }, dispatch] = useAppContext()

  useEffect(() => {
    const fetch = async () => {
      if (!selectedPatch || lolItemsData) return

      const lolItems = await getItems(selectedPatch)
      dispatch({ type: SET_LOL_ITEMS_DATA, payload: lolItems })
    }

    fetch()
  }, [selectedPatch])

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
