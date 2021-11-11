import { Details } from '@components/Details'
import GridSelect from '@components/GridSelect'
import { MenuBar } from '@components/MenuBar'
import { PatchSelect } from '@components/PatchSelect'
import { fetchPatches, selectChampions, selectSelectedPatch } from '@store/slices/championSlice'
import { fetchItems } from '@store/slices/itemSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChampionModelContainer from './ChampionModelContainer'

export const App = () => {
  const champions = useSelector(selectChampions)
  const dispatch = useDispatch()
  const selectedPatch = useSelector(selectSelectedPatch)

  useEffect(() => {
    dispatch(fetchPatches())
  }, [])

  useEffect(() => {
    if (selectedPatch) dispatch(fetchItems())
  }, [selectedPatch])

  return (
    <div>
      <div className='overflow-hidden relative'>
        <img
          className='opacity-80 absolute left-0 top-0 h-full w-full'
          src='https://media.istockphoto.com/vectors/abstract-blue-motion-background-vector-id1253927908?b=1&k=20&m=1253927908&s=612x612&w=0&h=Q7SnaIqX3gO0eE8FQBBnEojrTOeKXxrYvU9WK36G49A='
        />
        <MenuBar />
        <PatchSelect />

        <div className='grid grid-cols-3 grid-rows-1 gap-2 relative m-10'>
          <GridSelect items={Object.values(champions).map((val) => ({ ...val }))} />
          <ChampionModelContainer />
          <Details />
        </div>
      </div>
    </div>
  )
}
