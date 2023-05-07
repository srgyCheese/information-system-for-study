import React, { useRef, useState } from 'react'
import { useUpdateProduct } from '../../../queries/productsQueries'
import './ProductShortCard.scss'

const EditProductShortCard = ({ product, cancelEdit }) => {
  const [editedProduct, setEditedProduct] = useState(product)
  const photoRef = useRef()
  const updateProduct = useUpdateProduct()

  const handleSubmit = e => {
    e.preventDefault()

    updateProduct.mutate({
      ...editedProduct,
      photos: photoRef.current?.files?.[0] ? photoRef.current.files : null
    }, {
      onSuccess: cancelEdit
    })
  }

  return (
    <div className="card short-product-card">
      <div className="card-body">
        <form onSubmit={handleSubmit} className='d-flex'>
          <div className='short-product-card__image'>
            <img src={product.ProductPhotos[0]?.url} />
            <input type='file' className='form-control mt-2' ref={photoRef} />
          </div>
          <div className='ps-4 w-100'>
            <input  
              className='form-control fs-3'
              value={editedProduct.title}
              onChange={e => setEditedProduct({...editedProduct, title: e.target.value})}
            />

            <textarea 
              className='form-control mt-3 mb-4'
              value={editedProduct.description}
              onChange={e => setEditedProduct({...editedProduct, description: e.target.value})}
            />

            <div className='border-rounded fw-bold fs-5 d-flex gap-3 mb-3'>
              <input 
                className='form-control fw-bold'
                value={editedProduct.price}
                onChange={e => setEditedProduct({...editedProduct, price: e.target.value})}
              /> ₽
            </div>
            <div className='d-flex gap-2'>
              <button
                className='btn btn-outline-success mt-2'
                type='submit'
                disabled={updateProduct.isLoading}
              >
                {updateProduct.isLoading && <span className="spinner-border spinner-border-sm me-2" />}
                Сохранить
              </button>
              <button
                className='btn btn-outline-danger mt-2'
                type='button'
                onClick={e => cancelEdit()}
              >
                Отмена
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductShortCard