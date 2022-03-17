import { MenuBar } from '@components/menu-bar'
import { FC } from 'react'

export const Layout: FC<{}> = ({ children }) => (
  <div className='flex flex-col bg-gradient-to-r from-sunset-500 to-sunset-100 min-h-0'>
    <div className='flex-intial'>
      <MenuBar />
    </div>
    <div className='flex-grow min-h-0 m-6'>{children}</div>
  </div>
)
