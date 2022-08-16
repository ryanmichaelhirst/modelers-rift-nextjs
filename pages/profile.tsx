import { useCurrentUserQuery } from '@graphql/generated/types'
import { formatRFC7231 } from 'date-fns'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Profile: NextPage = () => {
  const router = useRouter()
  const { data, loading, error, refetch } = useCurrentUserQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (error?.message === 'session has expired') {
      refetch()

      return
    }

    if (error && error.message !== 'session has expired') {
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  }, [error])

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
      {error && <div>You must login to see your profile!</div>}
      {loading || !data ? (
        <div>{error ? 'Redirecting...' : 'Loading profile...'}</div>
      ) : (
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
      )}
    </div>
  )
}

export default Profile
