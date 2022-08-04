import { MenuBar } from '@components/menu-bar'
import { useAppContext } from '@context/index'
import { FETCH_LOL_INFO } from '@customtypes/index'
import { FC, PropsWithChildren, useEffect } from 'react'

const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [, dispatch] = useAppContext()

  useEffect(() => {
    dispatch({ type: FETCH_LOL_INFO })
  }, [])

  if (children) return <>{children}</>

  return null
}

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div
    className='min-h-full'
    style={{ background: 'linear-gradient(123.76deg, #E4ABFF 0%, #F4F7F5 11.69%)' }}
  >
    <header className='h-[20vh]'>
      <MenuBar />
    </header>
    <div className='mx-4 md:mx-16'>
      <PageWrapper>{children}</PageWrapper>
    </div>
  </div>
)
