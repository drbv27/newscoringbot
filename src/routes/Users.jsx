import React from 'react'
import Layout from '../components/Layout'
import UsersList from '../components/UsersList'

const Users = () => {

  const fakeUsers = [
    {name:"diego",email:"uno@uno.com"},
    {name:"juan",email:"dos@uno.com"},
    {name:"isabel",email:"tres@uno.com"},
  ]

  return (
    <Layout>
        <h1>USUARIOS</h1>
        <hr />
        <UsersList usersArray={fakeUsers}/>
    </Layout>
  )
}

export default Users