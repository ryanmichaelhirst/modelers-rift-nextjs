import { Character } from '@/utils/trpc'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ModelState {
  character?: Character
  skin: string
  setSkin: (skin: string) => void
  setCharacter: (character: Character) => void
}

export const useModelStore = create<ModelState>()(
  devtools(
    persist(
      (set) => ({
        skin: 'skin0',
        animations: [],
        setSkin: (skin) => set((state) => ({ skin })),
        setCharacter: (character) => set((state) => ({ character })),
      }),
      {
        name: 'model-storage',
      },
    ),
  ),
)
