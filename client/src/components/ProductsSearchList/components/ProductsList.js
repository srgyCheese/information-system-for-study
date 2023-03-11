import React from 'react'
import ProductCard from './ProductCard'

const ProductsList = ({products}) => {
  return <>
    {
      products?.length
        ? products.map(product => <ProductCard product={product} key={product.id} />)
        : <h4>Нет товаров</h4>
    }
  </>
}

export default ProductsList