import { MenuBar } from '@components/menu-bar'
import React from 'react'

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div
    className='flex flex-col min-h-0'
    style={{ background: 'linear-gradient(123.76deg, #E4ABFF 0%, #F4F7F5 11.69%' }}
  >
    <div className='flex-intial'>
      <MenuBar />
    </div>
    <div className='flex-grow min-h-0 mx-20'>{children}</div>
  </div>
)
