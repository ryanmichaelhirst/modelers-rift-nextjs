import { Input } from '@components/input'
import { FETCH_NEW_CHAMPION, SET_ANIMATIONS, SET_CURRENT_ANIMATION } from '@customtypes/index'
import { useCharactersQuery } from '@graphql/generated/types'
import { useState } from 'react'
import { useAppContext } from '../context'

export const SearchBar = () => {
  const [selected, setSelected] = useState()
  const [, dispatch] = useAppContext()

  const { data, loading } = useCharactersQuery({
    variables: {
      filter: {
        typeEq: 'champion',
      },
      includeAssets: false,
      pageSize: 200,
    },
  })

  const onSearch = (e: React.SyntheticEvent<Element, Event>, value: any, reason: string) => {
    console.debug(e, value, reason)
    setSelected(value)
    dispatch({ type: FETCH_NEW_CHAMPION, payload: value })
    dispatch({ type: SET_CURRENT_ANIMATION })
    dispatch({ type: SET_ANIMATIONS })
  }

  return (
    <div>
      <Input
        onChange={onSearch}
        value={selected}
        classes='mb-4'
        options={data?.characters?.collection?.map((c) => c?.displayName || '') || []}
        label='Choose a champion'
        muiClasses={{
          autoComp: {
            root: 'bg-white/30 border-none py-2',
          },
          textField: {
            root: 'text-gum-500 nunito text-lg',
            notchedOutline: 'border-none',
          },
          label: {
            root: 'text-gum-500 nunito text-lg',
            // TODO: this is being override by mui label focused class
            focused: 'text-gum-500',
          },
        }}
      />
    </div>
  )
}
