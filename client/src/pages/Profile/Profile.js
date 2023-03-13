import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { AuthContext } from '../../contexts/AuthContext'

const Profile = () => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

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
        </div>
      </div>
    </Layout>
  )
}

export default Profile