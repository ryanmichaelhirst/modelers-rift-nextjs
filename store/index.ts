import { Character } from '@utils/trpc'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ModelState {
  character?: Character
  skin: string
  animations: string[]
  setSkin: (skin: string) => void
  setCharacter: (character: Character) => void
  setAnimations: (animations: string[]) => void
}

export const useModelStore = create<ModelState>()(
  devtools(
    persist(
      (set) => ({
        skin: 'skin0',
        animations: [],
        setSkin: (skin) => set((state) => ({ skin })),
        setCharacter: (character) => set((state) => ({ character })),
        setAnimations: (animations) => set((state) => ({ animations })),
      }),
      {
        name: 'model-storage',
      },
    ),
  ),
)
