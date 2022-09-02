import { NavButton } from '@components/button'
import { ComboBox } from '@components/combo-box'
import { Dropdown } from '@components/dropdown'
import { useAppContext } from '@context/index'
import { Character, FETCH_NEW_CHAMPION } from '@customtypes/index'
import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import { trpc } from '@utils/trpc'
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

  const logout = trpc.useMutation('user.logout')
  const { data: loginData, refetch } = trpc.useQuery(['user.current'])
  console.log({ loginData })
  const { data } = trpc.useQuery([
    'character.all',
    {
      filter: {
        typeEq: 'champion',
      },
      includeAssets: false,
      page: 1,
      pageSize: 200,
    },
  ])

  const characters = data?.collection?.filter(Boolean) ?? []

  const onClick = async (e: any) => {
    const { id } = e.target
    const value = (() => {
      if (id === 'home') return ''

      return id
    })()

    setPage(id)
    router.push(`/${value.toLowerCase()}`)
  }

  const onDropdownClick = async (value: string) => {
    if (value === 'logout') {
      await logout.mutateAsync()
      await refetch()

      router.push('/')

      return
    }

    setPage(value)
    router.push(`/${value.toLowerCase()}`)
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

      <div className='flex items-center'>
        {['home', 'models'].map((item) => (
          <NavButton
            id={item}
            onClick={onClick}
            key={item}
            classes={{
              button: classNames(item === page && 'text-primary'),
            }}
            text={item}
          />
        ))}
        {!loginData?.id && (
          <NavButton
            id='login'
            onClick={onClick}
            text={'login'}
            classes={{
              button: 'text-primary border-primary rounded shadow mr-4 py-1 px-5',
            }}
          />
        )}
        {/* <NavButton
          classes={{
            button: 'text-primary',
          }}
          text={'patreon'}
          disabled={true}
        /> */}
        <Dropdown loggedIn={!!loginData?.id} onClick={onDropdownClick} />
      </div>
    </div>
  )
}
