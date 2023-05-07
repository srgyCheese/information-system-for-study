import React from 'react'
import { useDeleteProduct } from '../../../queries/productsQueries'
import DeleteButton from '../../DeleteButton'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from '../../../hooks/usePermissions'

const ProductCard = ({product}) => {
  const deleteProduct = useDeleteProduct()
  const permissions = usePermissions()
  const navigate = useNavigate()
  
  const navigateToProduct = () => navigate(`/products/${product.id}`)

  return (
    <div className="card mb-3">
      <div className="d-flex">
        <div onClick={navigateToProduct} className='cursor-pointer'>
          <img
            style={{height: '176px', width: '160px'}}
            src={product.ProductPhotos?.[0]?.url} 
            className="rounded-start object-fit-contain"
          />
        </div>
        <div>
          <div className="card-body">
            <h5 className="card-title cursor-pointer" onClick={navigateToProduct}>{product.title}</h5>
            <p className="card-text">{product.description}</p>
          </div>
          {permissions.products.delete() && (
            <div className='position-absolute' style={{bottom: '10px', right: '10px'}}>
              <DeleteButton 
                onClick={() => {
                  deleteProduct.mutate(product.id)
                }}
                isLoading={deleteProduct.isLoading || deleteProduct.isSuccess}
              />
            </div>
          )}
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