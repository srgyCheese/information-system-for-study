import React, { useContext, useState } from 'react'
import Layout from '../../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateUser, useUser } from '../../queries/usersQueries'
import Spinner from '../../components/Spinner'
import EditUserCard from './components/EditUserCard'
import { toast } from 'react-toastify'
import { useTitle } from '../../hooks/useTitle'

const EditUser = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const userQuery = useUser(userId)
  
  useTitle(`Изменить ${userQuery?.data?.user && userQuery?.data?.user?.name}`)
  
  const updateUser = useUpdateUser()
  const [editedUser, setEditedUser] = useState({})

  if (userQuery.isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  const submitHandler = e => {
    e.preventDefault()

    if (!Object.values(editedUser)?.length) {
      return navigate(-1)
    }

    if (Object.values(editedUser).some(value => !value)) {
      return toast('Не введены поля', {
        type: 'error'
      })
    }

    if (editedUser.hasOwnProperty('password') && editedUser.password?.length < 6) {
      return toast('Длина пароля должна быть не менее 6 символов', {
        type: 'error'
      })
    }

    updateUser.mutate({id: userQuery.data.user.id, ...editedUser}, {
      onSuccess: () => navigate(-1)
    })
  }

  return (
    <Layout>
      <form onSubmit={submitHandler}>
        <div className='mb-3'>
          <EditUserCard user={userQuery.data.user} editedUser={editedUser} setEditedUser={setEditedUser} />
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
            onClick={() => navigate(-1)}
          >
            Отмена
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default EditUser