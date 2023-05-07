import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { AuthContext } from '../../contexts/AuthContext'
import { useTitle } from '../../hooks/useTitle'
import { useUser } from '../../queries/usersQueries'

const Profile = () => {
  useTitle('Профиль')
  const navigate = useNavigate()

  const auth = useContext(AuthContext)

  const userQuery = useUser(auth.user.id)

  if (userQuery.isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  const { user } = userQuery.data

  return (
    <Layout>
      <div className='d-flex container-fluid gap-3' style={{ padding: 0 }}>
        <div>
          <img
            src={user.photo}
            className='object-fit-contain'
            style={{ height: '300px', width: '300px' }}
          />
        </div>
        <div className='w-100'>
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">ФИО</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{user.name}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">E-mail</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{user.email}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Телефон</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{user.phone}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Роль</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{user.Role.title}</p>
            </div>
          </div>
          <button
            className='btn btn-outline-success mt-2'
            type='button'
            onClick={() => navigate(`/users/${user.id}/edit`)}
          >
            Изменить
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Profile