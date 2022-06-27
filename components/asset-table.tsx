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
    <table className='w-full'>
      <thead className='sticky top-0 border-sunset-800 border-b bg-[#FFF2F4]'>
        <tr className='text-left text-sunset-800 text-xl'>
          <th className='w-1/5 py-2'>#</th>
          <th className='w-3/5 py-2'>Title</th>
          <th className='w-1/5 py-2'>Type</th>
          <th className='w-1/5 py-2'>Time</th>
        </tr>
      </thead>
      <tbody>
        {data?.slice(0, 20).map((s, idx) => (
          <tr
            onClick={onRowClick(uriToUrl(s?.uri))}
            key={s?.uri}
            className={classNames(
              uriToUrl(s?.uri) === currentAudio
                ? 'text-sunset-900 font-semibold'
                : 'text-slate-400',
              'text-lg cursor-pointer hover:text-sunset-800',
            )}
          >
            <td className='py-1'>{idx}</td>
            <td className='py-1'>{s?.name}</td>
            <td className='py-1'>{s?.type?.toUpperCase()}</td>
            <td className='py-1'>{s?.duration?.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
