import React, { useContext, useRef, useState } from 'react'
import Popup from '../../../components/Popup'
import { PopupContext } from '../../../contexts/PopupContext'
import { toast } from 'react-toastify'
import { useGeoList } from '../../../queries/geoQueries'
import Spinner from '../../../components/Spinner'
import ChooseCity from '../../../components/ChooseCity/ChooseCity'
import { useAddWarehouse } from '../../../queries/warehousesQueries'


const AddWarehousePopup = () => {
  const { closePopup } = useContext(PopupContext)
  const geoQuery = useGeoList()
  const addWarehouse = useAddWarehouse()

  const [cityId, setCityId] = useState()
  const [address, setAddress] = useState()
  const [title, setTitle] = useState()

  if (geoQuery.isLoading) {
    return (
    <Popup title={`Добавление склада`}>
      <Spinner />
    </Popup>
    )
  }

  const submitHandler = async e => {
    e.preventDefault()

    if (!title) {
      return toast('Введите название', {
        type: 'error'
      })
    }

    if (!address) {
      return toast('Введите адрес', {
        type: 'error'
      })
    }

    if (!setCityId) {
      return toast('Выберите город', {
        type: 'error'
      })
    }

    addWarehouse.mutate({
      title,
      address,
      cityId
    }, {
      onSuccess: closePopup
    })
  }

  return (
    <Popup title={`Добавление склада`}>
      <form onSubmit={submitHandler}>
        <div className="form-outline mb-3">
          <label className="form-label">Название</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <ChooseCity cityId={cityId} setCityId={setCityId} />
        
        <div className="form-outline mt-3">
          <label className="form-label">Полный адрес</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={e => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <button type="submit" className="btn btn-success mt-4" disabled={addWarehouse.isLoading}>
          {addWarehouse.isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />}
          Создать
        </button>
      </form>
    </Popup>
  )
}

export default AddWarehousePopup