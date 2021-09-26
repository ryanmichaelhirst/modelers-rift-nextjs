import React from 'react'

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className='bg-gray-200 bg-opacity-50 rounded-xl w-1/3 my-10 p-5'>{children}</div>
}

export default Card
