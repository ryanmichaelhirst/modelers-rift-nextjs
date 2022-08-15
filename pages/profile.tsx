import { useCurrentUserQuery } from '@graphql/generated/types'
import { formatRFC7231 } from 'date-fns'
import { NextPage } from 'next'

const Profile: NextPage = () => {
  const { data, loading, error } = useCurrentUserQuery()
  console.log({ data, error })
  const createdAt = (() => {
    if (!data?.currentUser?.createdAt) return
    const date = new Date(data.currentUser.createdAt)

    return formatRFC7231(date)
  })()

  const updatedAt = (() => {
    if (!data?.currentUser?.updatedAt) return
    const date = new Date(data.currentUser.updatedAt)

    return formatRFC7231(date)
  })()

  return (
    <div>
      <h1>Profile</h1>
      {loading && <div>Loading your profile...</div>}
      <div className='mt-10 p-4 border border-slate-300 rounded shadow'>
        <div className='mb-4'>
          <label className='mb-1 text-tertiary'>Name</label>
          <p className='text-tertiary text-lg'>{data?.currentUser?.name}</p>
        </div>

        <div className='mb-4'>
          <label className='mb-1 text-tertiary'>Email</label>
          <p className='text-tertiary text-lg'>{data?.currentUser?.email}</p>
        </div>

        <div className='mb-4'>
          <label className='mb-1 text-tertiary'>Created at</label>
          <p className='text-tertiary text-lg'>{createdAt}</p>
        </div>

        <div className='mb-4'>
          <label className='mb-1 text-tertiary'>Last updated</label>
          <p className='text-tertiary text-lg'>{updatedAt}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
