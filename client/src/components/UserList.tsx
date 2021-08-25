import React, { useEffect, useState } from 'react'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUser = async () => {
      const userJson = await fetch('/api/getUsers').then((res) => res.json())
      setUsers(userJson)
    }

    getUser()
  }, [])

  return (
    <div className='mt-10'>
      <p>Prisma User Table</p>
      <pre>{JSON.stringify(users, null, '\t')}</pre>
    </div>
  )
}

export default UserList
