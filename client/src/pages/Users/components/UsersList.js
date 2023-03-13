import React from 'react'
import { useUsers } from '../../../queries/usersQueries'
import Spinner from '../../../components/Spinner'
import { useNavigate } from 'react-router-dom'

const UsersList = () => {
  const usersQuery = useUsers()
  const navigate = useNavigate()

  if (usersQuery.isLoading) {
    return <Spinner />
  }

  return (
    <div>
      {usersQuery.data.users?.map(user => (
        <div className="card mb-3">
          <div className="d-flex">
            <div className="cursor-pointer" style={{ height: '176px', width: '160px' }} onClick={() => navigate(`/users/${user.id}`)}>
              <img src={user.photo} className="img-fluid rounded-start h-100 w-100 object-fit-contain" />
            </div>
            <div>
              <div className="card-body">
                <h5 className="card-title cursor-pointer" onClick={() => navigate(`/users/${user.id}`)}>{user.name}</h5>
                <p className="card-text">
                  <div>
                    <span className='text-muted'>E-mail:</span> {user.email}
                  </div>
                  <div>
                    <span className='text-muted'>Телефон:</span> {user.phone}
                  </div>
                  <div>
                    <span className='text-muted'>Роль:</span> {user.Role.title}
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UsersList