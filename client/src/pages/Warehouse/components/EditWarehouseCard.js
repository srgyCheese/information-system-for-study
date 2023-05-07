import React, { useState } from 'react'
import { useUpdateWarehouse } from '../../../queries/warehousesQueries'
import { toast } from 'react-toastify'

const EditWarehouseCard = ({ warehouse, disableEditing }) => {
  const updateWarehouse = useUpdateWarehouse()

  const [editedWarehouse, setEditedWarehouse] = useState({})

  const editInputTextProps = (valueName) => {
    return {
      value: editedWarehouse[valueName] == undefined ? warehouse[valueName] : editedWarehouse[valueName],
      onChange: e => setEditedWarehouse({
        ...editedWarehouse,
        [valueName]: e.target.value
      })
    }
  }

  const submitHandler = e => {
    e.preventDefault()

    if (!Object.keys(editedWarehouse)?.length) {
      return disableEditing()
    }
    
    if (editedWarehouse.hasOwnProperty('title') && !editedWarehouse.title) {
      return toast('Введите название', {
        type: 'error'
      })
    }
    
    if (editedWarehouse.hasOwnProperty('address') && !editedWarehouse.address) {
      return toast('Введите адрес', {
        type: 'error'
      })
    }

    updateWarehouse.mutate({id: warehouse.id, ...editedWarehouse}, {
      onSuccess: disableEditing
    })
  }

  return <form onSubmit={submitHandler}>
    <input 
      type="text"
      className='form-control mb-2 fw-bold'
      placeholder='Название'
      {...editInputTextProps('title')}
    />
    <input 
      type="text"
      className='form-control mb-2'
      placeholder='Адрес'
      {...editInputTextProps('address')}
    />

    <div className="d-flex gap-2 mt-3">
      <button 
        className='btn btn-outline-success' 
        type='submit'
        disabled={updateWarehouse.isLoading}
      >
        {updateWarehouse.isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" />}
        Сохранить
      </button>
      <button 
        className='btn btn-outline-danger' 
        type='button'
        onClick={disableEditing}
      >
        Отмена
      </button>
    </div>
  </form>
}

export default EditWarehouseCard