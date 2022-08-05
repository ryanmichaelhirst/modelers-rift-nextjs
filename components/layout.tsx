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
  <div className='min-h-full'>
    <header className='sticky top-0 bg-white z-20 h-[10vh]'>
      <MenuBar />
    </header>
    <div className='mx-4 md:mx-16 h-[90vh]'>
      <PageWrapper>{children}</PageWrapper>
    </div>
  </div>
)
