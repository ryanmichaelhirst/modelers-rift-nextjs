import { ChampionBasicInfo, ChampionDetailedInfo, Item } from '@/types'
import { HTTP_SAFE_CHAMPION_NAMES } from '@/types/constants'
import 'isomorphic-fetch' // polyfill fetch for frontend and backend

class DataDragonService {
  private latestPatch: string

  constructor() {
    this.latestPatch = '12.18.1'
  }

  // run get-lol-patches to find the latest patch
  getLatestPatch = () => this.latestPatch

  // given 'aurelionsol' returns 'AurelionSol'
  getJsonName = (name: string) => {
    const httpSafeName = name
      ?.replace(/[.'& ]/g, '')
      .replace('Willump', '')
      .replace('Glasc', '')
      .toLowerCase()

    return HTTP_SAFE_CHAMPION_NAMES.find((cn) => cn.toLowerCase() === httpSafeName)
      ?.split(/(?=[A-Z])/)
      .join('')
  }

  getChampions = async (
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

  getChampion = async (selectedPatch: string, name: string) => {
    const jsonName = this.getJsonName(name)

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

  // given 'tahmkench' returns 'Tahm Kench'
  getDisplayName = (name: string) => {
    if (name.toLowerCase() === 'jarvaniv') return 'Jarvan IV'

    return HTTP_SAFE_CHAMPION_NAMES.find((cn) => cn.toLowerCase() === name.toLowerCase())
      ?.split(/(?=[A-Z])/)
      .join(' ')
  }

  /* ITEMS */
  getItems = async (selectedPatch: string) => {
    const { data } = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${selectedPatch}/data/en_US/item.json`,
    ).then<{ data: Record<string, Item> }>((res) => res.json())

    return Object.values(data).reduce<any>((acc, value) => {
      acc[value.name] = value

      return acc
    }, {})
  }

  getPatches = async () =>
    await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then<string[]>((res) =>
      res.json(),
    )

  getLoreLink = (region: string, name: string) =>
    `https://universe.leagueoflegends.com/${region}/champion/${name}/`

  // expects name formatted as 'Tahm Kench'
  getSplashArtLink = (displayName: string | null | undefined, skinNum: number | string) =>
    `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${displayName?.replace(
      ' ',
      '',
    )}_${skinNum}.jpg`

  getAssetDisplayName = (url?: string | null) => {
    const pieces = url?.split('/') ?? []
    const words = pieces[pieces.length - 1].replace('.ogg', '').replace(/_/g, ' ').split(' ')

    return words.map((w) => `${w[0].toUpperCase()}${w.substring(1)}`).join(' ')
  }
}

export const dataDragonService = new DataDragonService()
