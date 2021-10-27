import Input from '@components/Input'
import {
  fetchChampions,
  selectPatches,
  selectSelectedPatch,
  setSelectedPatch,
} from '@store/slices/championSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const PatchSelect = () => {
  const dispatch = useDispatch()
  const selectedPatch = useSelector(selectSelectedPatch)
  const patches = useSelector(selectPatches)

  useEffect(() => {
    if (selectedPatch) dispatch(fetchChampions())
  }, [selectedPatch])

  const onInput = (e: React.SyntheticEvent<Element, Event>, value: any, reason: string) =>
    dispatch(setSelectedPatch(value))

  return (
    <div className='pl-6 mt-6'>
      {selectedPatch && (
        <Input
          sx={{ width: 300 }}
          onChange={onInput}
          value={selectedPatch}
          classes='mb-4'
          options={patches}
          label='Select patch'
        />
      )}
    </div>
  )
}
