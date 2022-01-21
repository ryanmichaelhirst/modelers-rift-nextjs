import Input from '@components/Input'
import { SET_SELECTED_PATCH, useAppContext } from '../context'

export const PatchSelect = () => {
  const [{ patches, selectedPatch }, dispatch] = useAppContext()

  const onInput = (e: React.SyntheticEvent<Element, Event>, value: any, reason: string) =>
    dispatch({ type: SET_SELECTED_PATCH, payload: value })

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
