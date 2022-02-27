import { AssetPlayer } from '@components/asset-player'
import { SET_CURRENT_SOUND } from '@customtypes/index'
import { useAssetsQuery } from '@graphql/generated/types'
import { lowercaseChampionNames } from '@utils/index'
import { usePopupState } from 'material-ui-popup-state/hooks'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useAppContext } from '../context'
import { AudioFilter } from './audio-filter'
import { AudioList } from './audio-list'
import { EnhancedPopper } from './popper'

export const AudioPlayer: FC = () => {
  const [{ currentSound, selectedChampion }, dispatch] = useAppContext()
  const [audioEl, setAudioEl] = useState<HTMLAudioElement>()
  const listPopupState = usePopupState({
    variant: 'popover',
    popupId: 'animation-player-popup',
  })
  const filterPopupState = usePopupState({
    variant: 'popover',
    popupId: 'animation-player-filter-popup',
  })
  const { query } = useRouter()
  // const [query, setQuery] = useQueryParams({
  //   typeIncludes: withDefault(ArrayParam, ['sfx', 'vo']),
  //   selectedInteractions: withDefault(ArrayParam, []),
  // })

  const { data, loading, error } = useAssetsQuery({
    variables: {
      filter: {
        characterName: selectedChampion.basicInfo?.name?.toLowerCase(),
        typeIncludes: ['sfx', 'vo'],
      },
    },
  })
  const allInteractions =
    data?.assets
      ?.filter((a) => lowercaseChampionNames.find((name) => a?.name?.includes(name)))
      .map((a) => {
        const name = lowercaseChampionNames.find((name) => a?.name?.includes(name))

        return name ?? ''
      }) ?? []
  const uniqueInteractions = Array.from(new Set(allInteractions))
  const audios = data?.assets

  useEffect(() => {
    if (currentSound) {
      // pause previous audio
      audioEl?.pause()
      fetch(`/api/audio/${currentSound}`)
        .then((res) => {
          const htmlAudio = new Audio(res.url)
          htmlAudio.play()
          setAudioEl(htmlAudio)
        })
        .catch((err) => {
          console.debug(`failed to play sound ${err}`)
        })
    }
  }, [currentSound])

  const onPrev = () => {
    if (!currentSound || !audios) return

    const curIndex = audios.findIndex((s) => s?.path === currentSound)
    const prevIndex = curIndex === audios.length - 1 ? 0 : curIndex - 1
    const prevSound = audios[prevIndex]
    if (!prevSound?.path) return

    dispatch({ type: SET_CURRENT_SOUND, payload: prevSound.path })
  }

  const onNext = () => {
    if (!currentSound || !audios) return

    const curIndex = audios.findIndex((s) => s?.path === currentSound)
    const nextIndex = curIndex === audios.length - 1 ? 0 : curIndex + 1
    const nextSound = audios[nextIndex]
    if (!nextSound?.path) return

    dispatch({ type: SET_CURRENT_SOUND, payload: nextSound.path })
  }

  const onFilter = ({
    typeIncludes,
    selectedInteractions,
  }: {
    typeIncludes: string[]
    selectedInteractions: string[]
  }) => {
    // setQuery({
    //   typeIncludes,
    //   selectedInteractions,
    // })
  }

  const audio = audios?.find((a) => a?.path === currentSound)

  return (
    <div>
      <AssetPlayer
        asset={audio?.name}
        placeholder={'Pick an Audio'}
        onPrev={onPrev}
        onNext={onNext}
        listPopupState={listPopupState}
        filterPopupState={filterPopupState}
      />
      <EnhancedPopper popupState={listPopupState}>
        {/* TODO: fix type */}
        {/* @ts-ignore */}
        <AudioList audios={audios} />
      </EnhancedPopper>
      <EnhancedPopper popupState={filterPopupState}>
        <AudioFilter interactions={uniqueInteractions} onFilter={onFilter} />
      </EnhancedPopper>
    </div>
  )
}
