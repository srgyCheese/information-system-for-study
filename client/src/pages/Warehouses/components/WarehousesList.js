import React, { useContext, useEffect, useState } from 'react'
import { useWarehouses } from '../../../queries/warehousesQueries'
import Spinner from '../../../components/Spinner'
import { useNavigate } from 'react-router-dom'

const WarehousesList = () => {
  const warehousesQuery = useWarehouses()
  const navigate = useNavigate()
  
  if (warehousesQuery.isLoading) {
    return <Spinner />
  }

  if (!warehousesQuery.data?.warehouses?.length) {
    return <h4>Нет складов</h4>
  }

  return (
    <div>
      {warehousesQuery.data.warehouses.map(warehouse => (
        <div className='card mb-3'>
          <div className='card-body'>
            <h5 class="card-title cursor-pointer" onClick={() => navigate(`/warehouses/${warehouse.id}`)}>{warehouse.title}</h5>
            <div className='text-muted'>{warehouse.address}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WarehousesList