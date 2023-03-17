import React, { useContext, useState } from 'react'
import Layout from '../../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateUser, useUser } from '../../queries/usersQueries'
import Spinner from '../../components/Spinner'
import EditUserCard from './components/EditUserCard'
import { toast } from 'react-toastify'

const EditUser = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const userQuery = useUser(userId)
  const updateUser = useUpdateUser()
  const [editedUser, setEditedUser] = useState()

  if (userQuery.isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  const submitHandler = e => {
    e.preventDefault()

    if (!editedUser?.phone || !editedUser?.name || !editedUser?.email) {
      return toast('Не введены поля', {
        type: 'error'
      })
    }

    updateUser.mutate(editedUser, {
      onSuccess: () => navigate(`/users/${userId}`)
    })
  }

  return (
    <Layout>
      <form onSubmit={submitHandler}>
        <div className='mb-3'>
          <EditUserCard user={editedUser || userQuery.data.user} setUser={setEditedUser} />
        </div>

        <div className='d-flex gap-3'>
          <button
            className='btn btn-outline-success'
            type='submit'
            disabled={updateUser.isLoading}
          >
            {updateUser.isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />}
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
      </form>
    </Layout>
  )
}

export default EditUser