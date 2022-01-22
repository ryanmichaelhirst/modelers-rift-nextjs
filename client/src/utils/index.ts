import { ChampionBasicInfo, ChampionDetailedInfo, Item } from '@customtypes/index'
import { getJsonName } from '../../../bin/utils/index'

/* CHAMPIONS */
export const getChampions = async (patch: string) => {
  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`,
  ).then<{ data: Record<string, ChampionBasicInfo> }>((res) => res.json())

  const championsWithAssets = Object.keys(data).reduce<Record<string, any>>((acc, cur) => {
    const lowerCaseName = cur.toLowerCase()

    return {
      ...acc,
      [lowerCaseName]: {
        ...data[cur],
        square_asset: `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${cur}.png`,
      },
    }
  }, {})

  return championsWithAssets
}

export const getChampion = async (selectedPatch: string, name: string) => {
  const jsonName = getJsonName(name)

  // get champion info from league api
  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${selectedPatch}/data/en_US/champion/${jsonName}.json`,
  ).then<{ data: Record<string, ChampionDetailedInfo> }>((res) => res.json())

  // i.e. { Aatrox: { allytips; blurb; etc etc } }
  const keys = Object.keys(data).map((key) => key)
  const firstKey = keys[0]
  const obj = data[firstKey]

  return obj
}

/* ITEMS */
export const getItems = async (selectedPatch: string) => {
  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${selectedPatch}/data/en_US/item.json`,
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
  `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${displayName?.replace(
    ' ',
    '',
  )}_${skinNum}.jpg`
