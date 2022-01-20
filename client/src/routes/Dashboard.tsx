import ChampionModelContainer from '@components/ChampionModelContainer'
import { Details } from '@components/Details'
import GridSelect from '@components/GridSelect'
import { Layout } from '@components/Layout'
import { PatchSelect } from '@components/PatchSelect'
import { fetchPatches, selectSelectedPatch } from '@store/slices/championSlice'
import { fetchItems } from '@store/slices/itemSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const selectedPatch = useSelector(selectSelectedPatch)

  useEffect(() => {
    dispatch(fetchPatches())
  }, [])

  useEffect(() => {
    if (selectedPatch) dispatch(fetchItems())
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
