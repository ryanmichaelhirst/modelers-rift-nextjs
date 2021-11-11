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

  const onInput = (e: React.SyntheticEvent<Element, Event>, value: any, reason: string) => {
    dispatch(setSelectedPatch(value))
  }

  return (
    <div className='m-6 flex justify-end'>
      <Input
        sx={{ width: 300 }}
        onChange={onInput}
        value={selectedPatch}
        classes='mb-4'
        options={patches}
        label='Select patch'
        variant='standard'
      />
    </div>
  )
}
