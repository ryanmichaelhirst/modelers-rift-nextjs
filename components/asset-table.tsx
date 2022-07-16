import { useAppContext } from '@context/index'
import { SET_CURRENT_AUDIO } from '@customtypes/index'
import type { Asset } from '@graphql/generated/types'
import { uriToUrl } from '@utils/index'
import classNames from 'classnames'

export const AssetTable: React.FC<{ data?: (Asset | null | undefined)[] }> = ({ data }) => {
  const [{ currentAudio }, dispatch] = useAppContext()

  const onRowClick = (url?: string | null) => () => {
    if (!url) return

    dispatch({ type: SET_CURRENT_AUDIO, payload: url })
  }

  return (
    <table className='w-full font-nunito'>
      <thead className='block border-slate-200 border-b'>
        <tr className='flex text-left text-slate-400'>
          <th className='w-1/6 py-2 font-normal'>#</th>
          <th className='w-3/6 py-2 font-normal'>Title</th>
          <th className='w-1/6 py-2 font-normal'>Type</th>
          <th className='w-1/6 py-2 font-normal'>Time</th>
        </tr>
      </thead>
      <tbody className='block overflow-y-scroll h-[400px]'>
        {data?.slice(0, 20).map((s, idx) => (
          <tr
            onClick={onRowClick(uriToUrl(s?.uri))}
            key={s?.uri}
            className={classNames(
              uriToUrl(s?.uri) === currentAudio ? 'text-primary font-semibold' : 'text-slate-400',
              'flex text-left cursor-pointer hover:text-primary',
            )}
          >
            <td className='py-1 w-1/6'>{idx}</td>
            <td className='py-1 w-3/6'>{s?.name}</td>
            <td className='py-1 w-1/6'>{s?.type?.toUpperCase()}</td>
            <td className='py-1 w-1/6'>{s?.duration?.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
