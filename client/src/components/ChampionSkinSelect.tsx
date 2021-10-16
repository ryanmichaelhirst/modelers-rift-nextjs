import { setSelectedSkin } from '@store/slices/championSlice'
import { useDispatch } from 'react-redux'

const ChampionSkinSelect = ({ skins }: { skins?: any[] }) => {
  const dispatch = useDispatch()

  const onClick = (src: string) => () => dispatch(setSelectedSkin(src))

  return (
    <>
      <p className='font-bold text-lg text-white mb-5'>Skins</p>
      <div className='flex'>
        {skins?.map((s) => (
          <img
            key={s.id}
            src={s.src}
            className='rounded-md mr-2 h-14 w-14 object-cover object-top'
            alt={s.name}
            onClick={onClick(`skin${s.num}`)}
          />
        ))}
      </div>
      <p className='font-bold text-lg text-white mb-5'>Chromas</p>
      <div className='flex'>
        {Array.from(Array(19).keys())
          .filter((k) => !skins?.some((s) => s.num === k))
          .map((k) => (
            <span key={k} className='mr-2' onClick={onClick(`skin${k}`)}>
              {k}
            </span>
          ))}
      </div>
    </>
  )
}

export default ChampionSkinSelect
