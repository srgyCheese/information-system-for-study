import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useProduct } from '../../queries/productsQueries'
import Spinner from '../../components/Spinner'
import { useCategories } from '../../queries/categoryQueries'
import ProductBreadcrumbs from './components/ProductBreadCrumbs'
import ProductShortCard from './components/ProductShortCard'
import { useTitle } from '../../hooks/useTitle'
import EditProductShortCard from './components/EditProductShortCard'
import ProductAttributes from './components/ProductAttributes'
import EditProductAttributes from './components/EditProductAttributes'

const Product = () => {
  const { productId } = useParams()

  const categoriesQuery = useCategories()
  const productQuery = useProduct({ productId })

  const [isProductEditing, setIsProductEditing] = useState(false)
  const [isAttributesEditing, setIsAttributesEditing] = useState(false)

  const cancelAttributesEditing = useCallback(() => setIsAttributesEditing(false), [])

  useTitle(productQuery?.data?.product?.title)

  if (productQuery?.isLoading || categoriesQuery.isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  const { product } = productQuery.data

  return (
    <Layout>
      <ProductBreadcrumbs productId={productId} />
      <p className='text-muted'>ID: {product.id}</p>
      {isProductEditing ? 
        <EditProductShortCard 
          product={product}
          cancelEdit={() => setIsProductEditing(false)}
        /> :
        <ProductShortCard 
          product={product}
          startEdit={() => setIsProductEditing(true)}
        />
      }

      <h4 className='mt-3'>Характеристики</h4>

      {isAttributesEditing ? (
        <EditProductAttributes
          product={product}
          cancelEdit={cancelAttributesEditing}
        />
      ) : (
        <ProductAttributes
          productValues={product.ProductValues}
          startEdit={() => setIsAttributesEditing(true)}
        />
      )}

    </Layout>
  )
}

export default Product