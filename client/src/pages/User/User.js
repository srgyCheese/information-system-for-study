import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../queries/usersQueries'
import Spinner from '../../components/Spinner'
import UserCard from './components/UserCard'
import { usePermissions } from '../../hooks/usePermissions'

const User = () => {
  const {userId} = useParams()
  const permissions = usePermissions()
  const userQuery = useUser(userId)
  const navigate = useNavigate()

  if (userQuery.isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  return (
    <Layout>
      <UserCard user={userQuery.data.user} />
      
      {permissions.canChangeUser(userQuery.data.user) && (
        <button 
          className='btn btn-outline-success' 
          type='button'
          onClick={() => navigate(`/users/${userId}/edit`)}
        >
          Изменить
        </button>
      )}
    </Layout>
  )
}

export default User