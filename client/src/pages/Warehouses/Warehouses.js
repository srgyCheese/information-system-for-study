import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { PopupContext } from '../../contexts/PopupContext'
import { useTitle } from '../../hooks/useTitle'
import AddWarehousePopup from './components/AddWarehousePopup'
import WarehousesList from './components/WarehousesList'

const Warehouses = () => {
  useTitle('Склады')

  const {openPopup} = useContext(PopupContext)

  return (
    <Layout>
      <button 
        className='btn btn-outline-success' 
        type='button'
        onClick={() => openPopup(<AddWarehousePopup />)}
      >
        Добавить склад
      </button>
      <hr />
      <WarehousesList />
    </Layout>
  )
}

export default Warehouses