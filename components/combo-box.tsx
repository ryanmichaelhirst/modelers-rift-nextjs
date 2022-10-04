import { Combobox, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'
import { SelectorIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { FC, Fragment, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const ComboBox: FC<
  PropsWithChildren<{
    displayValue: (value: any) => string
    onInput: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSearch: (value: any) => void
    selected: any
    afterLeave: () => void
    classes?: { box?: string; options?: string }
    showIcon?: boolean
    placeholder?: string
  }>
> = ({
  displayValue,
  onInput,
  onSearch,
  selected,
  afterLeave,
  children,
  classes,
  showIcon = true,
  placeholder = 'Search...',
}) => {
  return (
    <Combobox value={selected} onChange={onSearch}>
      <div className={twMerge('relative', classes?.box)}>
        <div className='item-center flex justify-center rounded p-1 shadow'>
          {showIcon && <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />}
          <Combobox.Input
            className={classNames(
              'w-full border-none text-sm leading-5 !outline-none',
              showIcon ? 'pl-4' : 'pl-2',
            )}
            displayValue={displayValue}
            onChange={onInput}
            placeholder={placeholder}
          />
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={afterLeave}
        >
          <Combobox.Options
            className={twMerge(
              'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
              classes?.options,
            )}
          >
            {children}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
