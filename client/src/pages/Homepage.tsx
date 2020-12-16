import React from 'react'

interface HomepageProps {
  name: string
  depth: number
}

const Homepage = (props: HomepageProps) => {
  return <div className='mt-2'>Time to start coding!</div>
}

export default Homepage
