import { MenuBar } from '@components/menu-bar'
import React from 'react'

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div
    className='min-h-full'
    style={{ background: 'linear-gradient(123.76deg, #E4ABFF 0%, #F4F7F5 11.69%)' }}
  >
    <header className='h-[20vh]'>
      <MenuBar />
    </header>
    <div className='mx-4 md:mx-20'>{children}</div>
  </div>
)
