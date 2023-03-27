import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../../components/Spinner'

const ProductCard = ({ product, isLoading, textMessage }) => {
  if (textMessage) {
    return (
      <div className="card" style={{ height: '176px' }}>
        <div className='d-flex align-items-center h-100 justify-content-center'>
          <h4>{textMessage}</h4>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="card" style={{ height: '176px' }}>
        <div className='d-flex align-items-center h-100 justify-content-center'>
          <Spinner />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="card" style={{ height: '176px' }}>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="d-flex">
        <div style={{ height: '176px', width: '160px' }}>
          <img src={product.ProductPhotos[0].url} className="img-fluid rounded-start h-100 w-100 object-fit-contain" />
        </div>
        <div>
          <div className="card-body">
            <Link to={`/products/${product.id}`} target='_blank' className='text-dark text-decoration-none'>
              <h5 className="card-title cursor-pointer">{product.title}</h5>
            </Link>
            <p className="card-text">{product.description}</p>
          </div>
          <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
            <div className="border-rounded fw-bold fs-5">{product.price} ₽</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard