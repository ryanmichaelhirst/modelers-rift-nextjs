import { Button } from '@/components/button'
import { H1 } from '@/components/h1'
import { formatLocalDate } from '@/utils'
import { trpc } from '@/utils/trpc'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Profile: NextPage = () => {
  const router = useRouter()
  const { data: user, error, refetch, isLoading } = trpc.user.current.useQuery()
  const { data: donations } = trpc.donation.list.useQuery({
    filter: {
      userIdEq: user?.id ?? -1,
    },
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
    if (!user?.createdAt) return

    return formatLocalDate(user.createdAt)
  })()

  const updatedAt = (() => {
    if (!user?.updatedAt) return

    return formatLocalDate(user.updatedAt)
  })()

  const isDonating = donations?.collection && donations?.collection?.length > 0

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
        <p className='mb-2 text-tertiary'>Donations</p>
        {isDonating ? (
          <>
            {donations?.collection.map((d) => (
              <div key={d.id} className='flex items-center'>
                <p className='mr-2 text-lg text-tertiary'>{d.productName}</p>
                <p className='rounded bg-primary px-2 text-white'>{d.dollarAmount}</p>
              </div>
            ))}
            <div className='mt-4'>
              <p>
                Thank you for donating! If you would like to make another donation or become a
                patron click{' '}
                <Link href='/support-us' className='text-primary'>
                  here
                </Link>
              </p>
            </div>
          </>
        ) : (
          <div className='my-2'>
            <p className='my-2'>Make a donation to start downloading champion assets!</p>
            <Button text='Donate' onClick={() => router.push('/donate')} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
