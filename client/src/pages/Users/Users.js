import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { PopupContext } from '../../contexts/PopupContext'
import { usePermissions } from '../../hooks/usePermissions'
import { useTitle } from '../../hooks/useTitle'
import AddUserPopup from './components/AddUserPopup'
import UsersList from './components/UsersList'

const Users = () => {
  const {openPopup} = useContext(PopupContext)
  const permissions = usePermissions()
  useTitle('Сотрудники')

  return (
    <Layout>
      {permissions.users.create() && (
        <div>
          <button 
            className='btn btn-outline-success' 
            type='button'
            onClick={() => openPopup(<AddUserPopup />)}
          >
            Добавить сотрудника
          </button>
          <hr />
        </div>
      )}

      <UsersList />
    </Layout>
  )
}

export default Users