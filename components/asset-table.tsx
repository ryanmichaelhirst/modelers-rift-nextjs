import type { Asset } from '@/utils/trpc'
import classNames from 'classnames'

export const AssetTable: React.FC<{
  data?: Asset[]
  onRowClick: (asset?: Asset) => () => void
  selectedAsset?: Asset
}> = ({ data, onRowClick, selectedAsset }) => {
  return (
    <table className='w-full font-nunito'>
      <thead className='block border-b border-slate-200'>
        <tr className='flex text-left text-slate-400'>
          <th className='w-1/6 py-2 font-normal'>#</th>
          <th className='w-3/6 py-2 font-normal'>Title</th>
          <th className='w-1/6 py-2 font-normal'>Type</th>
          <th className='w-1/6 py-2 font-normal'>Time</th>
        </tr>
      </thead>
      <tbody className='block h-[100px] md:h-[500px] overflow-y-scroll'>
        {data?.map((s, idx) => (
          <tr
            onClick={onRowClick(s)}
            key={s?.uri}
            className={classNames(
              s?.url === selectedAsset?.url ? 'font-semibold text-primary' : 'text-slate-400',
              'flex cursor-pointer text-left hover:text-primary',
            )}
          >
            <td className='w-1/6 py-1'>{idx}</td>
            <td className='w-3/6 py-1'>{s?.name}</td>
            <td className='w-1/6 py-1'>{s?.type?.toUpperCase()}</td>
            <td className='w-1/6 py-1'>{s?.duration?.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
