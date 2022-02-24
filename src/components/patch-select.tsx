import Input from '@components/input'
import { useAppContext } from '@context/index'
import { SET_SELECTED_PATCH } from '@customtypes/index'

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
