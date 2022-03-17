import { useAppContext } from '@context/index'
import { SET_CURRENT_ANIMATION } from '@customtypes/index'
import classNames from 'classnames'

export const AnimationTable = () => {
  const [{ currentAnimation, animations }, dispatch] = useAppContext()

  const onRowClick = (animation: string) => () => {
    dispatch({ type: SET_CURRENT_ANIMATION, payload: animation })
  }

  return (
    <table className='w-full'>
      <thead className='sticky top-0 border-sunset-800 border-b bg-[#FFF2F4]'>
        <tr className='text-left text-sunset-800 text-xl'>
          <th className='w-1/5 py-2'>#</th>
          <th className='w-4/5 py-2'>Title</th>
        </tr>
      </thead>
      <tbody>
        {animations?.map((a, idx) => (
          <tr
            onClick={onRowClick(a)}
            key={a}
            className={classNames(
              a === currentAnimation ? 'text-sunset-900 font-semibold' : 'text-slate-400',
              'text-lg cursor-pointer hover:text-sunset-800',
            )}
          >
            <td className='py-1'>{idx}</td>
            <td className='py-1 overflow-hidden whitespace-nowrap'>{a}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
