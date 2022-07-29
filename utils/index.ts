import { HTTP_SAFE_CHAMPION_NAMES } from '@customtypes/constants'
import { ChampionBasicInfo, ChampionDetailedInfo, Item } from '@customtypes/index'
import 'isomorphic-fetch'

/* CHAMPIONS */
export const getChampions = async (
  patch: string,
): Promise<Record<string, ChampionBasicInfo & { square_asset: string }>> => {
  const { data } = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`,
  ).then<{ data: Record<string, ChampionBasicInfo> }>((res) => res.json())

  const championsWithAssets = Object.keys(data).reduce<Record<string, any>>((acc, cur) => {
    const lowerCaseName = cur.toLowerCase()

    return {
      ...acc,
      [lowerCaseName]: {
        ...data[cur],
        square_asset: `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${cur}.png`,
      },
    }
  }, {})

  return championsWithAssets
}

export const getChampion = async (selectedPatch: string, name: string) => {
  const jsonName = getJsonName(name)

  // get champion info from league api
  const { data } = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${selectedPatch}/data/en_US/champion/${jsonName}.json`,
  ).then<{ data: Record<string, ChampionDetailedInfo> }>((res) => res.json())

  // i.e. { Aatrox: { allytips; blurb; etc etc } }
  const keys = Object.keys(data).map((key) => key)
  const firstKey = keys[0]
  const obj = data[firstKey]

  return obj
}

// given 'aurelionsol' returns 'AurelionSol'
export const getJsonName = (name: string) => {
  const httpSafeName = name
    ?.replace(/[.'& ]/g, '')
    .replace('Willump', '')
    .replace('Glasc', '')
    .toLowerCase()

  return HTTP_SAFE_CHAMPION_NAMES.find((cn) => cn.toLowerCase() === httpSafeName)
    ?.split(/(?=[A-Z])/)
    .join('')
}

export const lowercaseChampionNames = HTTP_SAFE_CHAMPION_NAMES.map((name) => name.toLowerCase())

export const determineType = (name: string) => {
  const championType = HTTP_SAFE_CHAMPION_NAMES.map((n) => n.toLowerCase()).includes(
    name.toLowerCase(),
  )
  const tftType = name.includes('tft')
  const summonersRiftType = name.includes('sru')

  if (championType) return 'champion'
  if (tftType) return 'team_fight_tactics'
  if (summonersRiftType) return 'summoners_rift'

  return 'unknown'
}

// given 'tahmkench' returns 'Tahm Kench'
export const getDisplayName = (name: string) => {
  if (name.toLowerCase() === 'jarvaniv') return 'Jarvan IV'

  return HTTP_SAFE_CHAMPION_NAMES.find((cn) => cn.toLowerCase() === name.toLowerCase())
    ?.split(/(?=[A-Z])/)
    .join(' ')
}

// given 'the dog' returns 'The Dog'
export const capitalize = (str?: string | null) => {
  if (!str) return ''

  return str
    .split(' ')
    .reduce((acc, cur) => {
      acc += cur.charAt(0).toUpperCase() + cur.substring(1) + ' '

      return acc
    }, '')
    .trimEnd()
}

/* ITEMS */
export const getItems = async (selectedPatch: string) => {
  const { data } = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${selectedPatch}/data/en_US/item.json`,
  ).then<{ data: Record<string, Item> }>((res) => res.json())

  return Object.values(data).reduce<any>((acc, value) => {
    acc[value.name] = value

    return acc
  }, {})
}

/* PATCHES */
export const getPatches = async () =>
  await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then<string[]>((res) =>
    res.json(),
  )

export const getLoreLink = (region: string, name: string) =>
  `https://universe.leagueoflegends.com/${region}/champion/${name}/`

// expects name formatted as 'Tahm Kench'
export const getSplashArtLink = (displayName: string, skinNum: number | string) =>
  `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${displayName?.replace(
    ' ',
    '',
  )}_${skinNum}.jpg`

export const getAssetDisplayName = (url?: string | null) => {
  const pieces = url?.split('/') ?? []
  const words = pieces[pieces.length - 1].replace('.ogg', '').replace(/_/g, ' ').split(' ')

  return words.map((w) => `${w[0].toUpperCase()}${w.substring(1)}`).join(' ')
}
