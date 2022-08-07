import { NavButton } from '@components/button'
import { ComboBox } from '@components/combo-box'
import { useAppContext } from '@context/index'
import { Character, FETCH_NEW_CHAMPION } from '@customtypes/index'
import { useCharactersQuery } from '@graphql/generated/types'
import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

export const MenuBar: FC = () => {
  const router = useRouter()
  const [page, setPage] = useState('home')
  const [selected, setSelected] = useState<Character>()
  const [query, setQuery] = useState('')
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
  const characters = data?.characters?.collection?.filter(Boolean) ?? []

  const onClick = (e: any) => {
    const { id } = e.target
    const value = (() => {
      if (id === 'home') return ''

      return id
    })()

    setPage(id)
    router.push(`/${value.replace(' ', '_').toLowerCase()}`)
  }

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setQuery(value)
  }

  const onSearch = (character: Character) => {
    setSelected(character)
    if (!character?.displayName) return

    dispatch({ type: FETCH_NEW_CHAMPION, payload: character.displayName })
    router.push(`/models`)
  }

  const afterLeave = () => setQuery('')

  const filtered =
    query === ''
      ? characters
      : characters.filter((c) =>
          c?.displayName
            ?.toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  return (
    <div className='flex justify-between items-center px-4 py-5 h-full'>
      <div className='flex items-center'>
        <Image
          src={'/shen.svg'}
          width='56px'
          height='39px'
          className='cursor-pointer'
          onClick={() => router.push('/')}
        />
        <p className='text-black text-xl mx-6 cursor-pointer' onClick={() => router.push('/')}>
          Modeler's Rift
        </p>
      </div>

      <div className='flex items-center'>
        {['home', 'models', 'visualize'].map((item) => (
          <NavButton
            id={item}
            disabled={item === 'visualize'}
            onClick={onClick}
            key={item}
            classes={{
              button: classNames('mr-6 p-2', item === page && 'text-primary'),
            }}
            text={item}
          />
        ))}
        <NavButton
          classes={{
            button: 'mr-6 p-2 text-primary lowercase',
          }}
          text={'Patreon'}
          disabled={true}
        />
        <ComboBox
          onInput={onInput}
          onSearch={onSearch}
          selected={selected}
          afterLeave={afterLeave}
          displayValue={(character: Character) => character?.displayName ?? ''}
          classes={{ box: 'z-30' }}
          placeholder='Search champions...'
        >
          {filtered.length === 0 && query !== '' ? (
            <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
              Nothing found.
            </div>
          ) : (
            filtered.map((character) => (
              <Combobox.Option
                key={character?.id}
                className={({ active }) =>
                  classNames(
                    'relative capitalize cursor-default select-none py-2 pl-10 pr-4 z-30',
                    active ? 'bg-primary text-white' : 'text-tertiary',
                  )
                }
                value={character}
              >
                {({ selected, active }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {character?.name}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? 'text-white' : 'text-primary'
                        }`}
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </ComboBox>
      </div>
    </div>
  )
}
