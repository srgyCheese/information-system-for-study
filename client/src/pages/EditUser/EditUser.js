import React, { useContext, useState } from 'react'
import Layout from '../../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../queries/usersQueries'
import Spinner from '../../components/Spinner'
import EditUserCard from './components/EditUserCard'

const EditUser = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const userQuery = useUser(userId)
  const [editedUser, setEditedUser] = useState()

  if (userQuery.isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='mb-3'>
        <EditUserCard user={editedUser || userQuery.data.user} setUser={setEditedUser} />
      </div>

      <div className='d-flex gap-3'>
        <button
          className='btn btn-outline-success'
          type='button'
          onClick={() => navigate(`/users/${userId}`)}
        >
          Сохранить
        </button>
        <button
          className='btn btn-outline-danger'
          type='button'
          onClick={() => navigate(`/users/${userId}`)}
        >
          Отмена
        </button>
      </div>
    </Layout>
  )
}

export default EditUser