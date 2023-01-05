import { Menu, Transition } from '@headlessui/react'
import {
  CreditCardIcon,
  CubeIcon,
  HomeIcon,
  IdentificationIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { FC, Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

const btnClassname = (active: boolean) =>
  twMerge(
    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
    active ? 'bg-violet-500 text-white' : 'text-gray-900',
  )

export const Dropdown: FC<{ loggedIn: boolean; onClick: (value: string) => void }> = ({
  loggedIn,
  onClick,
}) => {
  // hacky fnc to workaroud id attribute being set by tailwind labs
  const onMenuItemClick = (value: string) => () => {
    onClick(value)
  }

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='flex cursor-pointer items-center justify-center rounded-full bg-primary/50 py-1 px-3 hover:bg-primary'>
        <MenuIcon className='h-5 w-5 text-white' />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1 '>
            {loggedIn && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onMenuItemClick('profile')}
                    id='profile'
                    className={btnClassname(active)}
                  >
                    <IdentificationIcon className='mr-2 h-5 w-5' />
                    Profile
                  </button>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  // headlessui doesn't let you set id's
                  // https://github.com/tailwindlabs/headlessui/discussions/1041
                  onClick={onMenuItemClick(loggedIn ? 'logout' : 'login')}
                  className={btnClassname(active)}
                >
                  {loggedIn ? (
                    <LogoutIcon className='mr-2 h-5 w-5' />
                  ) : (
                    <LoginIcon className='mr-2 h-5 w-5' />
                  )}
                  {loggedIn ? 'Logout' : 'Login'}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button onClick={onMenuItemClick('home')} className={btnClassname(active)}>
                  <HomeIcon className='mr-2 h-5 w-5' />
                  Home
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onMenuItemClick('models')}
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <CubeIcon className='mr-2 h-5 w-5' />
                  Models
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button onClick={onMenuItemClick('support-us')} className={btnClassname(active)}>
                  <CreditCardIcon className='mr-2 h-5 w-5' />
                  Support us
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
