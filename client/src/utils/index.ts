export const getChampions = async (patch: string) => {
  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`,
  ).then((res) => res.json())

  const championsWithAssets = Object.keys(data).reduce((acc, cur) => {
    return {
      ...acc,
      [cur.toLowerCase()]: {
        ...acc[cur],
        square_asset: `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${cur}.png`,
      },
    }
  }, data)

  return championsWithAssets
}

export const getChampion = async (selectedPatch: string, name: string) => {
  const capitalizedName = capitalizeWord(name)
  // get champion info from league api
  const { data } = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${selectedPatch}/data/en_US/champion/${capitalizedName}.json`,
  ).then((res) => res.json())

  // i.e. { Aatrox: { allytips; blurb; etc etc } }
  const keys = Object.keys(data).map((key) => key)
  const firstKey = keys[0]
  const obj = data[firstKey]

  return obj
}

export const capitalizeWord = (word?: string | null) => {
  if (!word) return ''

  return word.charAt(0).toUpperCase() + word.substring(1)
}
