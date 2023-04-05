import React, { useState } from 'react'
import { usePermissions } from '../../../hooks/usePermissions'
import './ProductShortCard.scss'

const ProductShortCard = ({product, startEdit}) => {
  const permissions = usePermissions()

  return (
    <div className="card short-product-card">
      <div className="card-body d-flex">
        <div className='short-product-card__image'>
          <img src={product.ProductPhotos[0].url} />
        </div>
        <div className='ps-4 w-100'>
          <h3>{product.title}</h3>
          <p>
            {product.description}
          </p>
          <div className='border-rounded fw-bold fs-5'>
            {product.price} ₽
          </div>
          {permissions.products.update() && (
            <button 
              className='btn btn-outline-success mt-2' 
              type='button'
              onClick={() => startEdit()}
            >
              Изменить
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductShortCard