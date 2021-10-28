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

export interface LeagueChampion {
  name?: string
  model?: {
    file?: string
    awsUrl?: string
  }
  tags?: string[]
  passive?: {
    image: DataDragonImage
    description?: string
    name?: string
  }
  spells?: { name?: string; id?: string; image?: DataDragonImage; tooltip?: string }[]
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
  selectedPatch?: string
  loreLink?: string
}
