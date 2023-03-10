import React from 'react'
import { useDeleteProduct } from '../../../queries/productsQueries'
import DeleteButton from '../../DeleteButton'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({product}) => {
  const deleteProduct = useDeleteProduct()
  const navigate = useNavigate()
  
  const navigateToProduct = () => navigate(`/products/${product.id}`)

  return (
    <div className="card mb-3">
      <div className="d-flex">
        <div style={{height: '176px', width: '160px'}} onClick={navigateToProduct} className='cursor-pointer'>
          <img 
            src={product.ProductPhotos?.[0]?.url} 
            className="img-fluid rounded-start h-100 w-100 object-fit-contain"
          />
        </div>
        <div>
          <div className="card-body">
            <h5 className="card-title cursor-pointer" onClick={navigateToProduct}>{product.title}</h5>
            <p className="card-text">{product.description}</p>
          </div>
          <div className='position-absolute' style={{bottom: '10px', right: '10px'}}>
            <DeleteButton 
              onClick={() => {
                deleteProduct.mutate(product.id)
              }}
              isLoading={deleteProduct.isLoading || deleteProduct.isSuccess}
            />
          </div>
          <div className='position-absolute' style={{top: '10px', right: '10px'}}>
            <div className='border-rounded fw-bold fs-5'>
              {product.price} ₽
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard