import React from 'react'
import './ProductShortCard.scss'

const ProductShortCard = ({product}) => {
  return (
    <div className="card short-product-card">
      <div className="card-body d-flex">
        <div className='short-product-card__image'>
          <img src={product.ProductPhotos[0].url} />
        </div>
        <div className='ps-4'>
          <h4>Описание</h4>
          <p>
            {product.description}
          </p>
          <div className='border-rounded fw-bold fs-5'>
            {product.price} ₽
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductShortCard