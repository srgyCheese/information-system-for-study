import React, { useContext } from 'react'
import { useProducts } from '../../queries/productsQueries'
import Spinner from '../Spinner'
import ProductCard from './components/ProductCard'

const ProductsSearchList = () => {
  const productsQuery = useProducts()

  if (productsQuery.isLoading) {
    return <Spinner />
  }

  return (
    <div>
      {
        productsQuery.data?.products?.length 
          ? productsQuery.data.products.map(product => <ProductCard product={product} />) 
          : <h4>Нет товаров</h4>
      }
    </div>
  )
}

export default ProductsSearchList