import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteWarehouse, useWarehouse } from '../../queries/warehousesQueries'
import { PopupContext } from '../../contexts/PopupContext'
import AddProductItemsPopup from './components/AddProductItemsPopup'
import ProductItemsList from './components/ProductItemsList'
import { useTitle } from '../../hooks/useTitle'
import EditWarehouseCard from './components/EditWarehouseCard'
import { usePermissions } from '../../hooks/usePermissions'

const Warehouse = () => {
  const {warehouseId} = useParams()
  const warehouseQuery = useWarehouse(warehouseId)
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()
  const permissions = usePermissions()

  const deleteWarehouse = useDeleteWarehouse()

  useTitle(warehouseQuery?.data?.warehouse?.title)

  const {openPopup} = useContext(PopupContext)

  if (warehouseQuery.isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  const {warehouse} = warehouseQuery.data

  const deleteWarehouseHandler = e => {
    deleteWarehouse.mutate(warehouseId, {
      onSuccess: () => navigate(-1),
    })
  }

  return (
    <Layout>
        {isEditing ? <EditWarehouseCard warehouse={warehouse} disableEditing={() => setIsEditing(false)} /> : <>
          <h3>{warehouse.title}</h3>
          <div className='text-muted'>{warehouse.address}</div>

          <div className="d-flex gap-2">
            {permissions.productItems.create() && (
              <button 
                className='btn btn-outline-success mt-3' 
                type='button'
                onClick={() => openPopup(<AddProductItemsPopup warehouseId={warehouseId} />)}
              >
                Добавить товары
              </button>
            )}
            {permissions.warehouses.update() && (
              <button 
                className='btn btn-outline-success mt-3' 
                type='button'
                onClick={() => setIsEditing(true)}
              >
                Изменить
              </button>
            )}
            {permissions.warehouses.delete() && (
              <button 
                className='btn btn-outline-danger mt-3' 
                type='button'
                onClick={deleteWarehouseHandler}
                disabled={deleteWarehouse.isLoading}
              >
                {deleteWarehouse.isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" />}
                Удалить
              </button>
            )}
          </div>
        </>}
      
      <hr />
      <ProductItemsList warehouseId={warehouseId} />
    </Layout>
  )
}

export default Warehouse