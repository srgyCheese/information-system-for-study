import React, { useContext, useEffect, useState } from 'react'
import { useWarehouses } from '../../../queries/warehousesQueries'
import Spinner from '../../../components/Spinner'

const WarehousesList = () => {
  const warehousesQuery = useWarehouses()
  
  if (warehousesQuery.isLoading) {
    return <Spinner />
  }

  return (
    <div>
      {warehousesQuery.data.warehouses.map(warehouse => (
        <div>
          {warehouse.title}
        </div>
      ))}
    </div>
  )
}

export default WarehousesList