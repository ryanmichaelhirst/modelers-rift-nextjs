import { SET_SELECTED_SKIN } from '@customtypes/index'
import { capitalizeWord } from '../../../bin/utils'
import { useAppContext } from '../context'
import { getSplashArtLink } from '../utils'

const SkinSelect = () => {
  const [{ selectedChampion }, dispatch] = useAppContext()

  const onClick = (num?: number) => () => {
    const skinNum = `skin${num}`
    dispatch({ type: SET_SELECTED_SKIN, payload: skinNum })
  }

  const championName = capitalizeWord(selectedChampion.basicInfo?.name)
  const skins = selectedChampion.detailedInfo?.skins

  return (
    <div className='mb-4'>
      <p>Skins</p>
      <div className='h-40 overflow-y-auto'>
        {skins?.map((skin) => {
          const backgroundImage = `url(${getSplashArtLink(championName, skin.num || 0)})`

          return (
            <div
              key={skin?.id}
              className='py-5 px-4 bg-cover'
              style={{
                backgroundImage,
              }}
              onClick={onClick(skin?.num)}
            >
              <span className='capitalize text-white'>{skin?.name}</span>
            </div>
          )
        })}
      </div>
      <p>Chromas</p>
      {Array.from(Array(19).keys())
        .filter((k) => !skins?.some((i) => i.num === k))
        .map((num) => (
          <span key={num} className='mr-2' onClick={onClick(num)}>
            {num}
          </span>
        ))}
    </div>
  )
}

export default SkinSelect
