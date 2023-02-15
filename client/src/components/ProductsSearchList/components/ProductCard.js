import React from 'react'
import { useDeleteProduct } from '../../../queries/productsQueries'
import DeleteButton from '../../DeleteButton'

const ProductCard = ({product}) => {
  const deleteProduct = useDeleteProduct()

  return (
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src={product.ProductPhotos?.[0]?.url} class="img-fluid rounded-start" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{product.title}</h5>
            <p class="card-text">{product.description}</p>
          </div>
          <div style={{position: 'absolute', bottom: '10px', right: '10px'}}>
            <DeleteButton 
              onClick={() => {
                deleteProduct.mutate(product.id)
              }}
              isLoading={deleteProduct.isLoading || deleteProduct.isSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard