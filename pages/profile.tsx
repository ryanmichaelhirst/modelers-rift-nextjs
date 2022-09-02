import { trpc } from '@utils/trpc'
import { formatRFC7231 } from 'date-fns'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Profile: NextPage = () => {
  const router = useRouter()
  const { data, error, refetch, isLoading } = trpc.useQuery(['user.current'])

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
    if (!data?.createdAt) return
    const date = new Date(data.createdAt)

    return formatRFC7231(date)
  })()

  const updatedAt = (() => {
    if (!data?.updatedAt) return
    const date = new Date(data.updatedAt)

    return formatRFC7231(date)
  })()

  return (
    <div>
      <h1>Profile</h1>
      {error && <div>You must login to see your profile!</div>}
      {isLoading || !data ? (
        <div>{error ? 'Redirecting...' : 'Loading profile...'}</div>
      ) : (
        <div className='mt-10 p-4 border border-slate-300 rounded shadow'>
          <div className='mb-4'>
            <label className='mb-1 text-tertiary'>Name</label>
            <p className='text-tertiary text-lg'>{data?.name}</p>
          </div>

          <div className='mb-4'>
            <label className='mb-1 text-tertiary'>Email</label>
            <p className='text-tertiary text-lg'>{data?.email}</p>
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
