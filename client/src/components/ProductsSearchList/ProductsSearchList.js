import React, { useMemo, useState } from 'react'
import { useProducts } from '../../queries/productsQueries'
import Spinner from '../Spinner'
import './ProductsSearchList.scss'
import { useCategories } from '../../queries/categoryQueries'
import ProductsSearchBar from './components/ProductsSearchBar'
import ProductsList from './components/ProductsList'
import { useSearchParams } from 'react-router-dom'

const ProductsSearchList = ({category}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchOptions = useMemo(() => {
    const query = Object.fromEntries(searchParams)
    query.category = category || query.category

    return query
  }, [searchParams])

  const productsQuery = useProducts(searchOptions)
  const categoriesQuery = useCategories()

  const searchWithOptions = options => {
    const actualOptions = {}

    if (options.title) {
      actualOptions.title = options.title
    }

    if (options.category && !category) {
      actualOptions.category = options.category
    }

    setSearchParams(actualOptions)
  }

  if (categoriesQuery.isLoading) {
    return <Spinner />
  }

  return (
    <div className='products-container'>
      <ProductsSearchBar
        searchWithOptions={searchWithOptions}
        initOptions={{searchOptions}}
        constOptions={{category}}
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