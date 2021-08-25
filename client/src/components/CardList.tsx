import React from 'react'

const cards = [
  {
    title: 'Web Dev Course',
    content: 'Become a front end engineer by copy-pasting from stackoverflow and youtube tutorials.',
  },
  {
    title: 'Instagram Course',
    content: 'Learn how to use an unofficial instagram api and get your account banned.',
  },
  {
    title: 'Robinhood Course',
    content: `Join legendary trading platform that doesn't let you invest in "volatile" sttocks.`,
  },
]

const CardList = () => (
  <div className='mt-5 flex flex-col items-stretch justify-center md:flex-row'>
    {cards.map(({ title, content }) => (
      <div
        key={title}
        className='flex flex-col font-roboto p-4 bg-blue-300 text-white rounded shadow-lg mr-3 md:w-1/3 cursor-pointer'
      >
        <h1 className='text-xl mb-2'>{title}</h1>
        <h3 className='text-lg'>{content}</h3>
      </div>
    ))}
  </div>
)

export default CardList
