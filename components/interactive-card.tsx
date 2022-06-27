import { AssetPlayer } from '@components/asset-player'
import { AssetTable } from '@components/asset-table'
import { BottomNavigation } from '@components/bottom-navigation'
import { GlassCard } from '@components/glass-card'
import { SkinCarousel } from '@components/skin-carousel'
import { AssetType } from '@customtypes/constants'
import { Asset, SelectedChampion } from '@customtypes/index'
import { useCharacterQuery } from '@graphql/generated/types'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import { AnimationPlayer } from './animation-player'
import { AnimationTable } from './animation-table'

const InteractiveCard = ({
  selectedChampion,
  data,
  model,
}: {
  selectedChampion: SelectedChampion
  data: ReturnType<typeof useCharacterQuery>['data']
  model: Asset
}) => {
  const router = useRouter()
  const filter = router.query.filter ? (router.query.filter as string | undefined) : 'audio'
  const assets = data?.character?.assets?.filter((a) => {
    return [AssetType.SFX, AssetType.VO].includes(a?.type as AssetType)
  })

  const onIconClick = (e: MouseEvent<HTMLButtonElement>) => {
    router.push({
      query: {
        filter: e.currentTarget.value,
      },
    })
  }

  // TODO: move to upload-assets script
  const skinName = selectedChampion.detailedInfo?.skins?.find(
    (skin) => skin.num?.toString() === model?.skin?.replace(/skin/g, ''),
  )?.name

  return (
    <GlassCard classes='flex flex-col h-full min-h-0' hasPadding={false}>
      <div className='flex-initial p-7'>
        <p className='text-slate-500 pb-0 text-sm font-nunito font-bold'>{skinName}</p>
        <p className='text-sunset-900 text-2xl font-nunito pb-2'>
          {selectedChampion.basicInfo?.name}
        </p>
        <SkinCarousel />
      </div>
      <div className='flex-grow flex flex-col min-h-0'>
        <GlassCard
          classes='flex-auto flex flex-col bg-white/70 rounded-t-lg p-4 min-h-0'
          hasPadding={false}
          rounded={false}
        >
          <div className='flex-initial'>
            <div className='text-[#FF6BD0] bg-[#FECFEF] inline-block px-4 py-1 rounded-xl text-sm font-semibold capitalize'>
              {`${filter}s`}
            </div>
          </div>
          <div className='flex-grow mt-4 min-h-0 overflow-y-auto'>
            {filter === 'audio' && <AssetTable data={assets} />}
            {filter === 'animation' && <AnimationTable />}
          </div>
          <div className='flex-auto flex items-end'>
            <div className='flex-auto'>
              {filter === 'audio' && <AssetPlayer assets={assets} />}
              {filter === 'animation' && <AnimationPlayer />}
            </div>
          </div>
        </GlassCard>
        <div className='flex flex-[0_0_50px] items-center justify-start rounded-b-lg bg-white'>
          <div className='pl-4 py-3'>
            <BottomNavigation onClick={onIconClick} selectedIcon={filter} />
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export default InteractiveCard
