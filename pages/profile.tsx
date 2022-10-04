import { Button } from '@/components/button'
import { H1 } from '@/components/h1'
import { trpc } from '@/utils/trpc'
import { formatRFC7231 } from 'date-fns'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Profile: NextPage = () => {
  const router = useRouter()
  const { data: user, error, refetch, isLoading } = trpc.useQuery(['user.current'])
  const { data: donations } = trpc.useQuery([
    'donation.list',
    {
      filter: {
        userIdEq: user?.id ?? -1,
      },
    },
  ])

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
    if (!user?.createdAt) return
    const date = new Date(user.createdAt)

    return formatRFC7231(date)
  })()

  const updatedAt = (() => {
    if (!user?.updatedAt) return
    const date = new Date(user.updatedAt)

    return formatRFC7231(date)
  })()

  return (
    <div>
      <H1>Profile</H1>
      {error && <div>You must login to see your profile!</div>}
      {isLoading || !user ? (
        <div>{error ? 'Redirecting...' : 'Loading profile...'}</div>
      ) : (
        <div className='mt-10 rounded border border-slate-300 p-4 shadow'>
          <div className='mb-4'>
            <label className='mb-1 text-tertiary'>Name</label>
            <p className='text-lg text-tertiary'>{user?.name}</p>
          </div>

          <div className='mb-4'>
            <label className='mb-1 text-tertiary'>Email</label>
            <p className='text-lg text-tertiary'>{user?.email}</p>
          </div>

          <div className='mb-4'>
            <label className='mb-1 text-tertiary'>Created at</label>
            <p className='text-lg text-tertiary'>{createdAt}</p>
          </div>

          <div className='mb-4'>
            <label className='mb-1 text-tertiary'>Last updated</label>
            <p className='text-lg text-tertiary'>{updatedAt}</p>
          </div>
        </div>
      )}
      <div className='mt-10 rounded border border-slate-300 p-4 shadow'>
        <div className='mb-4'>
          <label className='mb-1 text-tertiary'>Donations</label>
          {donations?.collection.map((d) => (
            <div key={d.id}>
              <p className='text-lg text-tertiary'>{d.productName}</p>
              <p>{d.dollarAmount}</p>
            </div>
          ))}
          {donations?.collection.length === 0 && (
            <div className='my-2'>
              <p className='my-2'>Make a donation to start downloading champion assets!</p>
              <Button text='Donate' onClick={() => router.push('/donate')} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
