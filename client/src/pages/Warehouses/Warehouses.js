import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { PopupContext } from '../../contexts/PopupContext'
import { usePermissions } from '../../hooks/usePermissions'
import { useTitle } from '../../hooks/useTitle'
import AddWarehousePopup from './components/AddWarehousePopup'
import WarehousesList from './components/WarehousesList'

const Warehouses = () => {
  useTitle('Склады')
  
  const permissions = usePermissions()

  const {openPopup} = useContext(PopupContext)

  return (
    <Layout>
      {permissions.canAddWarehouse() && (
        <div>
          <button 
            className='btn btn-outline-success' 
            type='button'
            onClick={() => openPopup(<AddWarehousePopup />)}
          >
            Добавить склад
          </button>
          <hr />
        </div>
      )}
      <WarehousesList />
    </Layout>
  )
}

export default Warehouses