import { H1 } from '@/components/h1'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ProfileCard = dynamic(() => import('../components/profile-card').then((m) => m.ProfileCard))

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
