import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { PopupContext } from '../../contexts/PopupContext'
import AddUserPopup from './components/AddUserPopup'
import UsersList from './components/UsersList'

const Users = () => {
  const {openPopup} = useContext(PopupContext)

  return (
    <Layout>
      <button 
        className='btn btn-outline-success' 
        type='button'
        onClick={() => openPopup(<AddUserPopup />)}
      >
        Добавить сотрудника
      </button>
      <hr />

      <UsersList />
    </Layout>
  )
}

export default Users