import Tabs from '@components/tabs'
import { STAT_OPTIONS } from '@customtypes/constants'
import { SelectedChampion } from '@customtypes/index'

const ChampionTabs = ({ champion }: { champion: SelectedChampion }) => {
  if (!champion.detailedInfo) return null

  const { spells, stats, skins, ally_tips, enemy_tips } = champion.detailedInfo

  const options = [
    {
      tab: 'Spells',
      content: (
        <>
          <div>
            {spells?.map((s) => (
              <div>{s.name}</div>
            ))}
          </div>
        </>
      ),
    },
    {
      tab: 'Stats',
      content: STAT_OPTIONS.map((s) => (
        <div key={s.value}>
          <span className='mr-3'>{s.label}</span>
          {/* @ts-ignore */}
          <span>{stats ? stats[s.value] : null}</span>
        </div>
      )),
    },
    {
      tab: 'Skins',
      content: (
        <>
          <div className='my-2 text-xs italic font-montserrat'>Hover for skin name</div>
          {skins?.map((s) => (
            <div className='inline-block mr-2 mb-2' key={s.id}>
              <img
                className='h-28 rounded'
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.basicInfo?.name}_${s.num}.jpg`}
                title={s.name}
              />
            </div>
          ))}
          ,
        </>
      ),
    },
    {
      tab: 'Tips',
      content: (
        <ul className='list-decimal list-inside'>
          {ally_tips?.concat(enemy_tips || []).map((t, idx) => (
            <li className='text-xs' key={`tip-${idx}`}>
              {t}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return <Tabs options={options} />
}

export default ChampionTabs
