import { NavButton } from '@/components/button'
import { ComboBox } from '@/components/combo-box'
import { Dropdown } from '@/components/dropdown'
import type { Character } from '@/utils/trpc'
import { trpc } from '@/utils/trpc'
import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useModelStore } from 'store'
import { twMerge } from 'tailwind-merge'

export const MenuBar: FC = () => {
  const router = useRouter()
  const character = useModelStore((state) => state.character)
  const setCharacter = useModelStore((state) => state.setCharacter)

  const [page, setPage] = useState('home')
  const [query, setQuery] = useState('')

  const logout = trpc.useMutation('user.logout')
  const { data: loginData, refetch } = trpc.useQuery(['user.current'])
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

  console.log(characters)

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
    if (!character?.displayName) return

    setCharacter(character)
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
    <div className='flex h-full items-center justify-between px-4 py-5'>
      <div className='flex items-center'>
        <Image
          src={'/shen.svg'}
          width='56px'
          height='39px'
          className='cursor-pointer'
          onClick={() => router.push('/')}
        />
        <p className='mx-6 cursor-pointer text-xl text-black' onClick={() => router.push('/')}>
          Modeler's Rift
        </p>
        <ComboBox
          onInput={onInput}
          onSearch={onSearch}
          selected={character}
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
                  twMerge(
                    'relative z-30 cursor-default select-none py-2 px-2 capitalize text-tertiary',
                    active && 'bg-primary text-white',
                  )
                }
                value={character}
              >
                {({ selected, active }) => (
                  <div className='flex items-center'>
                    <span className={twMerge('mr-1 text-primary', active && 'text-white')}>
                      <CheckIcon
                        className={twMerge('invisible h-5 w-5', selected && 'visible')}
                        aria-hidden='true'
                      />
                    </span>
                    <span className={twMerge('truncate font-normal', selected && 'font-medium')}>
                      {character?.name}
                    </span>
                  </div>
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
              button: twMerge(item === page && 'text-primary'),
            }}
            text={item}
          />
        ))}
        <NavButton
          id='support-us'
          onClick={onClick}
          text={'Support Us'}
          classes={{
            button: 'text-primary border-primary rounded shadow py-1 px-5',
          }}
        />
        {!loginData?.id && (
          <NavButton
            id='login'
            onClick={onClick}
            text={'Login'}
            classes={{
              button: 'text-primary border-primary rounded shadow py-1 px-5',
            }}
          />
        )}
        <Dropdown loggedIn={!!loginData?.id} onClick={onDropdownClick} />
      </div>
    </div>
  )
}
