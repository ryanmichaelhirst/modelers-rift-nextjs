import React from 'react'

const Header = ({ name, depth }: { name: string; depth: number }) => {
  console.log({ name, depth })

  return (
    <div className='flex space-around items-center font-montserrat text-2xl p-4 bg-blue-500 text-white'>
      <span className='mr-2'>Products</span>
      <span className='mr-2'>Documentation</span>
    </div>
  )
}

export default Header
