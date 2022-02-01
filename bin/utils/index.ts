export const championNames = [
  'Aatrox',
  'Ahri',
  'Akali',
  'Alistar',
  'Amumu',
  'Anivia',
  'Annie',
  'Ashe',
  'Azir',
  'Blitzcrank',
  'Brand',
  'Braum',
  'Caitlyn',
  'Cassiopeia',
  "Cho'Gath",
  'Corki',
  'Darius',
  'Diana',
  'DrMundo',
  'Draven',
  'Elise',
  'Evelynn',
  'Ezreal',
  'Fiddlesticks',
  'Fiora',
  'Fizz',
  'Galio',
  'Gangplank',
  'Garen',
  'Gnar',
  'Gragas',
  'Graves',
  'Hecarim',
  'Heimerdinger',
  'Irelia',
  'Janna',
  'JarvanIV',
  'Jax',
  'Jayce',
  'Jinx',
  'Kalista',
  'Karma',
  'Karthus',
  'Kassadin',
  'Katarina',
  'Kayle',
  'Kennen',
  'Khazix',
  "Kog'Maw",
  'Leblanc',
  'LeeSin',
  'Leona',
  'Lissandra',
  'Lucian',
  'Lulu',
  'Lux',
  'Malphite',
  'Malzahar',
  'Maokai',
  'MasterYi',
  'MissFortune',
  'Mordekaiser',
  'Morgana',
  'Nami',
  'Nasus',
  'Nautilus',
  'Nidalee',
  'Nocturne',
  'Nunu',
  'Olaf',
  'Orianna',
  'Pantheon',
  'Poppy',
  'Quinn',
  'Rammus',
  "Rek'Sai",
  'Renekton',
  'Rengar',
  'Riven',
  'Rumble',
  'Ryze',
  'Sejuani',
  'Shaco',
  'Shen',
  'Shyvana',
  'Singed',
  'Sion',
  'Sivir',
  'Skarner',
  'Sona',
  'Soraka',
  'Swain',
  'Syndra',
  'Talon',
  'Taric',
  'Teemo',
  'Thresh',
  'Tristana',
  'Trundle',
  'Tryndamere',
  'TwistedFate',
  'Twitch',
  'Udyr',
  'Urgot',
  'Varus',
  'Vayne',
  'Veigar',
  "Vel'Koz",
  'Vi',
  'Viktor',
  'Vladimir',
  'Volibear',
  'Warwick',
  'Wukong',
  'Xerath',
  'XinZhao',
  'Yasuo',
  'Yorick',
  'Zac',
  'Zed',
  'Ziggs',
  'Zilean',
  'Zyra',
  'Bard',
  'Ekko',
  'TahmKench',
  'Kindred',
  'Illaoi',
  'Jhin',
  'AurelionSol',
  'Taliyah',
  'Kled',
  'Ivern',
  'Camille',
  'Rakan',
  'Xayah',
  'Kayn',
  'Rrnn',
  'Zoe',
  'Kaisa',
  'Pyke',
  'Neeko',
  'Sylas',
  'Yuumi',
  'Qiyana',
  'Senna',
  'Aphelios',
  'Sett',
  'Lillia',
  'Yone',
  'Samira',
  'Seraphine',
  'Rell',
  'Viego',
  'Gwen',
  'Akshan',
  'Vex',
]

export const lowercaseChampionNames = championNames.map((name) => name.toLowerCase())

export const determineType = (name: string) => {
  const championType = championNames.map((n) => n.toLowerCase()).includes(name.toLowerCase())
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

  return championNames
    .find((cn) => cn.toLowerCase() === name.toLowerCase())
    ?.split(/(?=[A-Z])/)
    .join(' ')
}

// given 'aurelionsol' returns 'AurelionSol'
export const getJsonName = (name: string) => {
  return championNames
    .find((cn) => cn.toLowerCase() === name?.replace(' ', '').toLowerCase())
    ?.split(/(?=[A-Z])/)
    .join('')
}

export const capitalizeWord = (word?: string | null) => {
  if (!word) return ''

  return word.charAt(0).toUpperCase() + word.substring(1)
}
