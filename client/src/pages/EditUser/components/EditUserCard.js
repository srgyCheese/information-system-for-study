import React from 'react'

const EditUserCard = ({ user, setUser }) => {
  return (
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
            <p className="text-muted mb-0">
              <input 
                className='form-control'
                value={user.name}
                onChange={e => setUser({
                  ...user,
                  name: e.target.value
                })}
              />
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">E-mail</p>
          </div>
          <div className="col-sm-9">
            <p className="text-muted mb-0">
              <input 
                className='form-control'
                value={user.email}
                onChange={e => setUser({
                  ...user,
                  email: e.target.value
                })}
              />
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Телефон</p>
          </div>
          <div className="col-sm-9">
            <p className="text-muted mb-0">
              <input 
                className='form-control'
                value={user.phone}
                onChange={e => setUser({
                  ...user,
                  phone: e.target.value
                })}
              />
            </p>
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
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Пароль</p>
          </div>
          <div className="col-sm-9">
            <p className="text-muted mb-0">
              <input 
                className='form-control'
                value={user.password}
                onChange={e => setUser({
                  ...user,
                  password: e.target.value
                })}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUserCard