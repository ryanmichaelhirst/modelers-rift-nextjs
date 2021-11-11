export interface SelectOption {
  label: string
  value: string
}

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
  datavalues: Record<string, any>
  effect?: (null | number[])[]
  effectBurn?: (string | null)[]
  id?: string
  leveltip?: Record<string, string[]>
  maxammo?: string
  maxrank?: number
  range?: number[]
  rangeBurn?: string
  resource?: string
  tooltip?: string
  vars?: any[]
}

export interface LeagueChampion {
  name?: string
  model?: {
    file?: string
    awsUrl?: string
  }
  tags?: string[]
  passive?: Passive
  spells?: Spell[]
  stats?: Record<string, any>
  skins?: { id?: number; name?: string; num?: number }[]
  allytips?: string[]
  enemytips?: string[]
  info?: Record<string, number>
  image?: DataDragonImage
  title?: string
  recommended?: any[]
  lore?: string
  partype?: string
  key?: string
  id?: string
  blurb?: string
}

export interface ChampionState {
  loading: boolean
  selectedStat: string
  champions: Record<string, LeagueChampion>
  playerChampion: LeagueChampion
  opponentChampion?: LeagueChampion
  patches: string[]
  selectedPatch: string | null
  loreLink?: string
}

// TODO: add this to @components/Tooltip
export const isPassive = (value: any): value is Passive => {
  if (typeof value === 'object' && value !== null) {
    const hasTooltip = 'tooltip' in value

    return !hasTooltip
  }

  return false
}
