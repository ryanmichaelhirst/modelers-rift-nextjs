import { Input } from '@components/Input'
import { useState } from 'react'
import { useCharactersQuery } from '../../../graphql/generated/types'

export const SearchBar = () => {
  const [search, setSearch] = useState()

  const { data, loading } = useCharactersQuery({
    variables: {
      filter: {
        typeEq: 'champion',
      },
      pageSize: 200,
    },
  })

  const onSearch = (value: any) => {
    console.log(value)
  }

  return (
    <div>
      <Input
        onChange={onSearch}
        value={search}
        classes='mb-4'
        options={data?.characters?.collection?.map((c) => c?.displayName || '') || []}
        label='Search a champion...'
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
