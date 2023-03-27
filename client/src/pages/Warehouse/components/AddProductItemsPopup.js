import React, { useContext, useRef, useState } from 'react'
import Popup from '../../../components/Popup'
import { PopupContext } from '../../../contexts/PopupContext'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner'
import { useProduct } from '../../../queries/productsQueries'
import ProductCard from './ProductCard'
import { useAddProductItems } from '../../../queries/productItemsQueries'


const AddProductItemsPopup = ({ warehouseId }) => {
  const { closePopup } = useContext(PopupContext)
  const [productId, setProductId] = useState()
  const [quantity, setQuantity] = useState()
  const addProductItems = useAddProductItems()

  const productQuery = useProduct({productId})

  const submitHandler = async e => {
    e.preventDefault()

    if (!productId) {
      return toast('Введите ID товара', {
        type: 'error'
      })
    }

    if (!quantity) {
      return toast('Введите количество товара', {
        type: 'error'
      })
    }

    addProductItems.mutate({
      productId,
      quantity,
      warehouseId
    }, {
      onSuccess: closePopup
    })
  }

  return (
    <Popup title={`Добавление склада`}>
      <form onSubmit={submitHandler}>
        
        <div className="form-outline d-flex gap-2">
          <input 
            type="number" 
            className="form-control"
            placeholder='ID товара'
            onChange={e => setProductId(e.target.value)}
            value={productId}
          />
          <input 
            type="number" 
            className="form-control"
            placeholder='Количество'
            onChange={e => setQuantity(e.target.value)}
            value={quantity}
          />
        </div>

        <div className='mt-3'>
          <ProductCard 
            product={productQuery.data?.product} 
            isLoading={productQuery?.isLoading}
            textMessage={(productId && productQuery?.isFetched && !productQuery.data?.product) ? 'Такого товара нет' : null}
          />
        </div>

        <button type="submit" className="btn btn-success mt-4" disabled={addProductItems.isLoading}>
          {addProductItems.isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />}
          Создать
        </button>
      </form>
    </Popup>
  )
}

export default AddProductItemsPopup