import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import { useProductItems } from '../../../queries/productItemsQueries'

const ProductItemsList = ({warehouseId}) => {
  const productItemsQuery = useProductItems({warehouseId})

  if (productItemsQuery?.isLoading) {
    return <Spinner />
  }

  const {productItems} = productItemsQuery.data

  if (!productItems?.length) {
    return <h4>Товаров нет</h4>
  }

  return (
    <div className='d-flex flex-column gap-2'>
      {productItems.map(productItem => (
        <div className="card" key={productItem.id}>
          <div className="d-flex">
            <Link to={`/products/${productItem.Product.id}`}>
              <img 
                src={productItem.Product.ProductPhotos[0].url} 
                className="rounded-start object-fit-contain"
                style={{ height: '176px', width: '160px' }}
              />
            </Link>
            <div>
              <div className="card-body">
                <Link to={`/products/${productItem.Product.id}`} className='text-dark text-decoration-none'>
                  <h5 className="card-title cursor-pointer">{productItem.Product.title}</h5>
                </Link>
                <p className="card-text">{productItem.Product.description}</p>
              </div>
              <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
                <div className="border-rounded fw-bold fs-5">{productItem.count} шт.</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductItemsList