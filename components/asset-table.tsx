import { Asset } from '@customtypes/index'
import classNames from 'classnames'

export const AssetTable: React.FC<{
  data?: (Asset | null | undefined)[]
  onRowClick: (asset?: Asset | null) => () => void
  selectedAsset?: Asset | null
}> = ({ data, onRowClick, selectedAsset }) => {
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
        {data?.map((s, idx) => (
          <tr
            onClick={onRowClick(s)}
            key={s?.uri}
            className={classNames(
              s?.url === selectedAsset?.url ? 'text-primary font-semibold' : 'text-slate-400',
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
