import React from 'react'
import Header from './Header'
import CardList from './CardList'
import UserList from './UserList'

const App = () => {
  return (
    <>
      <Header />
      <div className='m-5'>
        <CardList />
        <UserList />
      </div>
    </>
  )
}

export default App
