import React, { useContext } from 'react'
import { useProducts } from '../queries/productsQueries'
import Spinner from './Spinner'

const ProductsSearchList = () => {
  const productsQuery = useProducts()

  if (productsQuery.isLoading) {
    return <Spinner />
  }

  return (
    <div>
      {productsQuery.data.products.map(product => (
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="..." class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{product.title}</h5>
                <p class="card-text">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductsSearchList