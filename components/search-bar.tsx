import { Input } from '@components/input'
import { FETCH_NEW_CHAMPION, SET_ANIMATIONS, SET_CURRENT_ANIMATION } from '@customtypes/index'
import { useCharactersQuery } from '@graphql/generated/types'
import { Box } from '@mui/material'
import Image from 'next/image'
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
    if (!value) return

    setSelected(value.label)
    dispatch({ type: FETCH_NEW_CHAMPION, payload: value.label })
    dispatch({ type: SET_CURRENT_ANIMATION })
    dispatch({ type: SET_ANIMATIONS })
  }

  return (
    <div>
      <Input
        onChange={onSearch}
        value={selected}
        classes='mb-4'
        options={
          data?.characters?.collection?.map((c) => {
            return { label: c?.displayName || '', value: c?.name }
          }) || []
        }
        renderOption={(props, option) => (
          <Box component='li' {...props}>
            <Image
              height='20'
              width='20'
              src={`http://ddragon.leagueoflegends.com/cdn/12.12.1/img/champion/${option.label.replace(
                / /g,
                '',
              )}.png`}
              className='rounded'
              alt={option}
            />
            <p className='ml-2'>{option.label}</p>
          </Box>
        )}
        isOptionEqualToValue={(option, value) => {
          if (option.label === value) return true

          return false
        }}
        label='Search champions...'
        muiClasses={{
          autoComp: {
            root: 'bg-white/30 border-none py-2',
          },
          textField: {
            root: 'text-primary text-lg',
            notchedOutline: 'border-none',
          },
          label: {
            root: 'text-primary text-lg',
            focused: '!text-primary',
          },
        }}
      />
    </div>
  )
}
