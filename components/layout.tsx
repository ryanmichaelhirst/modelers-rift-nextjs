import { MenuBar } from '@components/menu-bar'
import { FC, PropsWithChildren } from 'react'

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className='min-h-full'>
    <header className='sticky top-0 bg-white z-20 h-[10vh]'>
      <MenuBar />
    </header>
    <div className='mx-4 md:mx-16 h-[90vh]'>{children}</div>
  </div>
)
