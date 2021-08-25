import React from 'react'
import Header from './components/Header'
import Card from './components/Card'

const cards = [
  { title: 'Web Dev Course', content: 'Learn how to copy-paste from stackoverflow and youtube tutorials.' },
  {
    title: 'Instagram Course',
    content: 'Learn how to use an unofficial instagram api and get your account banned.',
  },
]

const App = () => {
  return (
    <>
      <Header name='Header' depth={1} />
      <div className='mt-5 flex flex-col items-stretch justify-center md:flex-row'>
        {cards.map((c) => (
          <Card key={c.title} title={c.title} content={c.content} />
        ))}
      </div>
    </>
  )
}

export default App
