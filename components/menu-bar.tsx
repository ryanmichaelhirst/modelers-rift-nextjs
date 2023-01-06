import { NavButton } from '@/components/button'
import { ComboBox } from '@/components/combo-box'
import { Dropdown } from '@/components/dropdown'
import { defaultModelHref } from '@/pages/model/[name]'
import type { Character } from '@/utils/trpc'
import { trpc } from '@/utils/trpc'
import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useModelStore } from 'store'
import { twMerge } from 'tailwind-merge'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const character = useModelStore((state) => state.character)
  const setCharacter = useModelStore((state) => state.setCharacter)
  const { data } = trpc.character.searchBar.useQuery()

  const characters = data?.collection?.filter(Boolean) ?? []

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setQuery(value)
  }

  const onSearch = (character: Character) => {
    if (!character?.displayName) return

    setCharacter(character)
    router.push(`/model/${character.name}`)
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
  )
}

export const MenuBar: FC = () => {
  const router = useRouter()
  const [page, setPage] = useState('home')
  const logout = trpc.user.logout.useMutation()
  const { data: user, refetch } = trpc.user.current.useQuery()

  const onClick = async (e: any) => {
    const { id } = e.target
    const value = (() => {
      if (id === 'home') return ''
      if (id === 'models') return defaultModelHref

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
    const route = value === 'models' ? defaultModelHref : value
    router.push(`/${route.toLowerCase()}`)
  }

  return (
    <div className='flex h-full items-center justify-between px-4 py-5'>
      <div className='flex items-center'>
        <div className='shrink-0 grow-0 basis-[56px]'>
          <Image
            alt='Modelers rift logo'
            src={'/shen.svg'}
            width='56'
            height='39'
            className='cursor-pointer'
            onClick={() => router.push('/')}
          />
        </div>
        <h1
          className='ml-2 hidden cursor-pointer text-black lg:flex lg:text-xl'
          onClick={() => router.push('/')}
        >
          Modeler's Rift
        </h1>
      </div>

      <div>
        <SearchBar />
      </div>

      <div className='flex items-center'>
        <div className='hidden items-center lg:flex'>
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
        </div>
        <Dropdown loggedIn={!!user?.id} onClick={onDropdownClick} />
      </div>
    </div>
  )
}
