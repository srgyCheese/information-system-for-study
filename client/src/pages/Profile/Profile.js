import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { AuthContext } from '../../contexts/AuthContext'

const Profile = () => {
  const {user} = useContext(AuthContext)

  if (!user) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container-fluid" style={{padding: 0}}>
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Full Name</p>
          </div>
          <div className="col-sm-9">
            <p className="text-muted mb-0">{user.name}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Email</p>
          </div>
          <div className="col-sm-9">
            <p className="text-muted mb-0">{user.email}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Phone</p>
          </div>
          <div className="col-sm-9">
            <p className="text-muted mb-0">{user.phone}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Role</p>
          </div>
          <div className="col-sm-9">
            <p className="text-muted mb-0">{user.Role.name}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile