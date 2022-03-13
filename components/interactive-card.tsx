import { GlassCard } from '@components/glass-card'
import { SkinCarousel } from '@components/skin-carousel'
import { useAppContext } from '@context/index'
import { useCharacterQuery } from '@graphql/generated/types'
import { BarChartOutlined, HeadphonesOutlined, VideocamOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const InteractiveCard = () => {
  const [{ selectedChampion }] = useAppContext()
  const { data, loading: characterLoading, error } = useCharacterQuery({
    variables: {
      filter: {
        nameEq: selectedChampion.basicInfo?.name?.toLowerCase(),
      },
      includeAssets: true,
    },
  })

  const sfx = data?.character?.assets?.filter((a) => a?.type === 'sfx')

  console.log({ data, sfx, error })

  return (
    <GlassCard classes='flex flex-col h-full' hasPadding={false}>
      <div className='flex-initial p-7'>
        <p className='text-slate-500 pb-0 text-sm font-nunito font-bold'>
          {selectedChampion.skin ?? 'Default'}
        </p>
        <p className='text-sunset-900 text-2xl font-nunito pb-2'>
          {selectedChampion.basicInfo?.name}
        </p>
        <SkinCarousel />
      </div>
      <div className='flex-auto flex flex-col'>
        <GlassCard
          classes='flex-auto flex flex-col bg-white/70 rounded-t-lg p-4'
          hasPadding={false}
          rounded={false}
        >
          <div className='flex-initial'>
            <div className='text-[#FF6BD0] bg-[#FECFEF] inline-block px-3 py-1 rounded-lg'>
              Audios
            </div>
          </div>
          <div className='mt-4 flex-auto overflow-y-auto max-h-60'>
            <table className='w-full'>
              <thead>
                <tr>
                  <td>#</td>
                  <td>Title</td>
                  <td>Type</td>
                  <td>Time</td>
                </tr>
              </thead>
              <tbody>
                {sfx?.slice(0, 20).map((s, idx) => (
                  <tr key={s?.path}>
                    <td>{idx}</td>
                    <td>{s?.name}</td>
                    <td>{s?.type}</td>
                    <td>{s?.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
        <div className='flex flex-[0_0_50px] items-center justify-start rounded-b-lg bg-white'>
          <div>
            <IconButton>
              <HeadphonesOutlined />
            </IconButton>
            <IconButton>
              <VideocamOutlined />
            </IconButton>
            <IconButton>
              <BarChartOutlined />
            </IconButton>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export default InteractiveCard
