import { ComboBox } from '@/components/combo-box'
import { dataDragonService } from '@/lib/ddragon'
import type { Asset, Character } from '@/utils/trpc'
import { Combobox } from '@headlessui/react'
import classNames from 'classnames'
import Image from 'next/image'

export const SkinSearchBar = ({
  onInput,
  onSearch,
  searchValue,
  afterLeave,
  filtered,
  query,
  data,
}: {
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: (value: Asset) => void
  searchValue?: Asset
  afterLeave: () => void
  filtered: Asset[]
  query: string
  data?:
    | (Character & {
        assets: Asset[]
      })
    | null
}) => {
  return (
    <ComboBox
      onInput={onInput}
      onSearch={onSearch}
      selected={searchValue}
      afterLeave={afterLeave}
      displayValue={(model: Asset) => model?.name ?? ''}
      classes={{ box: 'z-10 w-72' }}
      showIcon={false}
      placeholder='Search skins...'
    >
      {filtered.length === 0 && query !== '' ? (
        <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
          Nothing found.
        </div>
      ) : (
        filtered.map((model) => (
          <Combobox.Option
            key={model?.id}
            className={({ active }) =>
              classNames(
                'relative cursor-default select-none py-0 pl-10 pr-4 capitalize',
                active ? 'bg-primary text-white' : 'text-tertiary',
              )
            }
            value={model}
          >
            {({ selected }) => (
              <>
                <Image
                  height='20'
                  width='20'
                  src={
                    model?.name?.includes('Chroma')
                      ? '/no-image.jpg'
                      : dataDragonService.getSplashArtLink(
                          data?.displayName,
                          model?.skin?.replace('skin', '') ?? '',
                        )
                  }
                  className='rounded'
                  alt={model?.name ?? ''}
                />
                <span
                  className={classNames('ml-4 inline-block truncate', selected && 'font-medium')}
                >
                  {model?.name}
                </span>
              </>
            )}
          </Combobox.Option>
        ))
      )}
    </ComboBox>
  )
}
