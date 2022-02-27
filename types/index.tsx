import { useAnimations } from '@react-three/drei'
import type { Asset as AssetType } from 'graphql/generated/types'

/**
 * Components
 */
export interface SelectOption {
  label: string
  value: string
}
export interface AnimationHooks {
  cycleAnimations: () => void
  playAnimation: (selectedAnimation: string) => void
}

export type useAnimationResult = Omit<ReturnType<typeof useAnimations>, 'ref'>

export interface AnimatedModelProps {
  glbUrl: string
  timerLabel: string
  onSetAnimationMixer: ({ mixer, names, actions, clips }: useAnimationResult) => void
}

/**
 * Graphql
 */
export type Asset = AssetType | null | undefined

/**
 * DDragon
 */
export interface Item {
  colloq: string
  depth?: number
  description: string
  gold: {
    base: number
    purchasable: boolean
    total: number
    sell: number
  }
  image: {
    full: string
    sprite: string
    group: string
    h: number
    w: number
    x: number
    y: number
  }
  into?: string[]
  from?: string[]
  maps: Record<number, boolean>
  name: string
  plaintext: string
  stats: Record<string, number>
  tags: string[]
}

interface DataDragonImage {
  full?: string
  h?: number
  w?: number
  group?: string
  x?: number
  y?: number
  sprite?: string
}

export interface Passive {
  image?: DataDragonImage
  description?: string
  name?: string
}

export interface Spell extends Passive {
  cooldown?: number[]
  cooldownBurn?: string
  cost?: number[]
  costBurn?: string
  costType?: string
  datavalues?: Record<string, unknown>
  effect?: unknown[]
  effectBurn?: (null | string)[]
  id?: string
  leveltip?: Record<string, unknown>
  maxammo?: string
  maxrank?: number
  range?: number[]
  rangeBurn?: string
  resource?: string
  tooltip?: string
}

interface ChampionStats {
  armor?: number
  armorperlevel?: number
  attackdamage?: number
  attackdamageperlevel?: number
  attackrange?: number
  attackspeed?: number
  attackspeedperlevel?: number
  crit?: number
  critperlevel?: number
  hp?: number
  hpperlevel?: number
  hpregen?: number
  hpregenperlevel?: number
  movespeed?: number
  mp?: number
  mpperlevel?: number
  mpregen?: number
  mpregenperlevel?: number
  spellblock?: number
  spellblockperlevel?: number
}

export type ChampionStatsKey = keyof ChampionStats

export interface ChampionBasicInfo {
  blurb?: string
  id?: string
  image?: DataDragonImage
  info?: Record<string, number>
  key?: string
  name?: string
  partype?: string
  square_asset?: string
  stats?: ChampionStats
  tags?: string[]
  title?: string
  version?: string
}

export type ChampionDetailedInfo = Omit<ChampionBasicInfo, 'square_asset' | 'version'> & {
  ally_tips?: string[]
  enemy_tips?: string[]
  lore?: string
  passive?: Passive
  recommended?: string[]
  skins?: { chromas?: boolean; id?: string; name?: string; num?: number }[]
  spells?: Spell[]
}

export interface SelectedChampion {
  basicInfo?: ChampionBasicInfo
  detailedInfo?: ChampionDetailedInfo
  skin?: string
}

// TODO: add this to @components/Tooltip
export const isPassive = (value: any): value is Passive => {
  if (typeof value === 'object' && value !== null) {
    const hasTooltip = 'tooltip' in value

    return !hasTooltip
  }

  return false
}

/**
 * React Context
 */
export interface AppState {
  selectedChampion: SelectedChampion
  patches: string[]
  selectedPatch: string
  lolChampionsData: Record<string, any>
  lolItemsData: Record<string, Item>
  playAllAnimations?: boolean
  currentSound?: string
  currentAnimation?: string
  animations?: string[]
}

export const SET_SELECTED_PATCH = 'SET_SELECTED_PATCH'
export const SET_PATCHES = 'SET_PATCHES'
export const SET_SELECTED_CHAMPION = 'SET_SELECTED_CHAMPION'
export const SET_SELECTED_SKIN = 'SET_SELECTED_SKIN'
export const SET_CHAMPIONS = 'SET_CHAMPIONS'
export const SET_ITEMS = 'SET_LOL_ITEMS'
export const SET_CURRENT_ANIMATION = 'SET_CURRENT_ANIMATION'
export const SET_ANIMATIONS = 'SET_ANIMATIONS'
export const SET_PLAY_ALL_ANIMATIONS = 'SET_PLAY_ALL_ANIMATIONS'
export const SET_CURRENT_SOUND = 'SET_CURRENT_SOUND'

export type Action =
  | {
      type: typeof SET_SELECTED_PATCH
      payload: string
    }
  | {
      type: typeof SET_PATCHES
      payload: string[]
    }
  | {
      type: typeof SET_SELECTED_CHAMPION
      payload: SelectedChampion
    }
  | {
      type: typeof SET_SELECTED_SKIN
      payload: string
    }
  | {
      type: typeof SET_CHAMPIONS
      payload: Record<string, ChampionBasicInfo>
    }
  | {
      type: typeof SET_ITEMS
      payload: Record<string, Item>
    }
  | {
      type: typeof SET_CURRENT_ANIMATION
      payload?: string
    }
  | {
      type: typeof SET_ANIMATIONS
      payload?: string[]
    }
  | {
      type: typeof SET_PLAY_ALL_ANIMATIONS
      payload: boolean
    }
  | {
      type: typeof SET_CURRENT_SOUND
      payload?: string
    }

export const FETCH_LOL_INFO = 'FETCH_LOL_INFO'
export const FETCH_LOL_ITEMS = 'FETCH_LOL_ITEMS'
export const FETCH_NEW_CHAMPION = 'FETCH_NEW_CHAMPION'

export type AsyncAction =
  | {
      type: typeof FETCH_LOL_INFO
      payload?: null
    }
  | {
      type: typeof FETCH_LOL_ITEMS
      payload: string
    }
  | {
      type: typeof FETCH_NEW_CHAMPION
      payload: string
    }

export type ContextDispatch = React.Dispatch<AsyncAction | Action>
