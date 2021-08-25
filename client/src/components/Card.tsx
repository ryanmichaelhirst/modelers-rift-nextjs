import React from 'react'

const Card = ({ title, content }: { title: string; content: string }) => (
  <div className='flex flex-col font-roboto p-4 bg-blue-300 text-white rounded shadow-lg m-3 md:w-1/3 cursor-pointer'>
    <h1 className='text-xl mb-2'>{title}</h1>
    <h3 className='text-lg'>{content}</h3>
  </div>
)

export default Card
