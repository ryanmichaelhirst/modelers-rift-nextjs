import { useAppContext } from '@context/index'
import { SET_CURRENT_ANIMATION } from '@customtypes/index'
import classNames from 'classnames'

export const AnimationTable = () => {
  const [{ currentAnimation, animations }, dispatch] = useAppContext()

  const onRowClick = (animation: string) => () => {
    dispatch({ type: SET_CURRENT_ANIMATION, payload: animation })
  }

  return (
    <table className='w-full font-nunito'>
      <thead className='block border-slate-200 border-b'>
        <tr className='flex text-left text-slate-400'>
          <th className='w-1/5 py-2 font-normal'>#</th>
          <th className='w-4/5 py-2 font-normal'>Title</th>
        </tr>
      </thead>
      <tbody className='block overflow-y-scroll h-[400px]'>
        {animations?.map((a, idx) => (
          <tr
            onClick={onRowClick(a)}
            key={a}
            className={classNames(
              a === currentAnimation ? 'text-primary font-semibold' : 'text-slate-400',
              'flex text-left cursor-pointer hover:text-primary',
            )}
          >
            <td className='py-1 w-1/5'>{idx}</td>
            <td className='py-1 w-4/5'>{a}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
