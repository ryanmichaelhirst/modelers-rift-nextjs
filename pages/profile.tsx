import { H1 } from '@/components/h1'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import type { NextRequest, NextResponse } from 'next/server'
import { Suspense } from 'react'

const ProfileCard = dynamic(() => import('../components/profile-card').then((m) => m.ProfileCard))

export const checkUserIsLoggedIn = (req: NextRequest) => {
  // @ts-expect-error req.cookies defaults to {} or with values { token: 'the-value' }
  const cookies: Record<string, unknown> = req.cookies
  const isEmpty = Object.keys(cookies).length === 0
  const token = cookies['token']
  // console.log({ isEmpty, token })

  // TODO: why is token set as 'undefined' and not undefined?
  if (isEmpty || !token || token === 'undefined') {
    return {
      redirect: {
        destination: '/login',
        permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
      },
    }
  }

  return {
    props: {},
  }
}

export const getServerSideProps = async ({ req, res }: { req: NextRequest; res: NextResponse }) => {
  return checkUserIsLoggedIn(req)
}

const Profile: NextPage = () => {
  return (
    <div>
      <H1>Profile</H1>
      <Suspense fallback={'Loading'}>
        <ProfileCard />
      </Suspense>
    </div>
  )
}

export default Profile
