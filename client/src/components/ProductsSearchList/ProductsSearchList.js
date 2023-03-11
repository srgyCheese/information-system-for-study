import React, { useMemo, useState } from 'react'
import { useProducts } from '../../queries/productsQueries'
import Spinner from '../Spinner'
import './ProductsSearchList.scss'
import { useCategories } from '../../queries/categoryQueries'
import ProductsSearchBar from './components/ProductsSearchBar'
import ProductsList from './components/ProductsList'
import { useSearchParams } from 'react-router-dom'

const ProductsSearchList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchOptions = useMemo(() => Object.fromEntries(searchParams), [searchParams])

  const productsQuery = useProducts({
    ...searchOptions
  })
  const categoriesQuery = useCategories()

  if (categoriesQuery.isLoading) {
    return <Spinner />
  }

  return (
    <div className='products-container'>
      <ProductsSearchBar
        searchWithOptions={opt => {
          const _options = {}
          if (opt.title) {
            _options.title = opt.title
          }
          if (opt.category) {
            _options.category = opt.category
          }
          setSearchParams(_options)
        }}
        initOptions={searchOptions}
        isLoading={productsQuery.isLoading}
      />
      
      {productsQuery.isLoading
        ? <Spinner />
        : <ProductsList 
            products={productsQuery.data?.products} 
          />
      }
    </div>
  )
}

export default ProductsSearchList