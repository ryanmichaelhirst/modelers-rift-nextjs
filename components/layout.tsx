import { MenuBar } from '@/components/menu-bar'
import { useModelStore } from '@/store'
import { trpc } from '@/utils/trpc'
import { FC, PropsWithChildren, useEffect } from 'react'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { data: defaultCharacter } = trpc.useQuery(['character.all', { page: 1, pageSize: 1 }])
  const character = useModelStore((state) => state.character)
  const setCharacter = useModelStore((state) => state.setCharacter)

  useEffect(() => {
    if (!character && defaultCharacter) {
      setCharacter(defaultCharacter.collection[0])
    }
  }, [character, defaultCharacter])

  return (
    <div className='min-h-full'>
      <header className='sticky top-0 bg-white z-20 h-[10vh]'>
        <MenuBar />
      </header>
      <div className='mx-4 md:mx-16 h-[90vh] my-6'>{children}</div>
    </div>
  )
}
