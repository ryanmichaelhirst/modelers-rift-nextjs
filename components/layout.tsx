import { MenuBar } from '@components/menu-bar'
import { FC } from 'react'

export const Layout: FC<{}> = ({ children }) => (
  <div
    className='flex flex-col min-h-0'
    style={{ background: 'linear-gradient(123.76deg, #E4ABFF 0%, #F4F7F5 11.69%' }}
  >
    <div className='flex-intial'>
      <MenuBar />
    </div>
    <div className='flex-grow min-h-0 m-6'>{children}</div>
  </div>
)
