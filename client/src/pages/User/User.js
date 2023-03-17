import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteUser, useUser } from '../../queries/usersQueries'
import Spinner from '../../components/Spinner'
import UserCard from './components/UserCard'
import { usePermissions } from '../../hooks/usePermissions'

const User = () => {
  const {userId} = useParams()
  const permissions = usePermissions()
  const userQuery = useUser(userId)
  const deleteUserQuery = useDeleteUser()
  const navigate = useNavigate()

  if (userQuery.isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  const deleteUser = () => {
    deleteUserQuery.mutate(userId, {
      onSuccess: () => navigate(`/users/`)
    })
  }

  const isDeleting = deleteUserQuery.isLoading || deleteUserQuery.isSuccess

  return (
    <Layout>
      <UserCard user={userQuery.data.user} />
      
      {permissions.canChangeUser(userQuery.data.user) && <div className='mt-3 d-flex gap-3'>
        <button 
          className='btn btn-outline-success' 
          type='button'
          onClick={() => navigate(`/users/${userId}/edit`)}
        >
          Изменить
        </button>
        {permissions.canDeleteUser(userQuery.data.user) && (
          <button 
            className='btn btn-outline-danger' 
            type='button'
            onClick={deleteUser}
            disabled={isDeleting}
          >
            {isDeleting && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
            Удалить
          </button>
        )}
      </div>}
    </Layout>
  )
}

export default User