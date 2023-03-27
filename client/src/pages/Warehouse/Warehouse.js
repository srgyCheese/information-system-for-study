import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { useParams } from 'react-router-dom'
import { useWarehouse } from '../../queries/warehousesQueries'
import { PopupContext } from '../../contexts/PopupContext'
import AddProductItemsPopup from './components/AddProductItemsPopup'
import ProductItemsList from './components/ProductItemsList'
import { useTitle } from '../../hooks/useTitle'

const Warehouse = () => {
  const {warehouseId} = useParams()
  const warehouseQuery = useWarehouse(warehouseId)

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

  return (
    <Layout>
      <h3>{warehouse.title}</h3>
      <div className='text-muted'>{warehouse.address}</div>
      <button 
        className='btn btn-outline-success mt-3' 
        type='button'
        onClick={() => openPopup(<AddProductItemsPopup warehouseId={warehouseId} />)}
      >
        Добавить товары
      </button>
      <hr />
      <ProductItemsList warehouseId={warehouseId} />
    </Layout>
  )
}

export default Warehouse