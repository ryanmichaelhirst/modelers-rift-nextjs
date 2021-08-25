import React from 'react'
import Header from './Header'
import Card from './Card'

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

const App = () => {
  return (
    <>
      <Header />
      <div className='mt-5 flex flex-col items-stretch justify-center md:flex-row'>
        {cards.map((c) => (
          <Card key={c.title} title={c.title} content={c.content} />
        ))}
      </div>
    </>
  )
}

export default App
