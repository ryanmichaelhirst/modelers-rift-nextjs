import { MenuBar } from '@/components/menu-bar'
import { useModelStore } from '@/store'
import { trpc } from '@/utils/trpc'
import { FC, PropsWithChildren, useEffect } from 'react'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { data: firstCharacter } = trpc.character.first.useQuery()
  const character = useModelStore((state) => state.character)
  const setCharacter = useModelStore((state) => state.setCharacter)

  useEffect(() => {
    if (!character && firstCharacter) {
      setCharacter(firstCharacter)
    }
  }, [character, firstCharacter])

  return (
    <div className='min-h-full'>
      <header className='sticky top-0 z-20 h-[10vh] bg-white'>
        <MenuBar />
      </header>
      <div className='mx-4 my-6 min-h-[90vh] md:mx-16'>{children}</div>
      <footer className='mx-4 mb-10 text-xs text-slate-300 md:mx-16'>
        <hr className='mb-4' />
        <p>
          © 2022 Modeler's Rift. Modeler's Rift isn’t endorsed by Riot Games and doesn’t reflect the
          views or opinions of Riot Games or anyone officially involved in producing or managing
          League of Legends. League of Legends and Riot Games are trademarks or registered
          trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
        </p>
      </footer>
    </div>
  )
}
