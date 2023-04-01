import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useProduct } from '../../queries/productsQueries'
import Spinner from '../../components/Spinner'
import { useCategories } from '../../queries/categoryQueries'
import ProductBreadcrumbs from './components/ProductBreadCrumbs'
import ProductShortCard from './components/ProductShortCard'
import { useTitle } from '../../hooks/useTitle'
import EditProductShortCard from './components/EditProductShortCard'

const getValue = (productValue) => {
  const valueType = productValue.CategoryAttribute.ValueType

  switch (valueType.name) {
    case 'bool':
      return !!productValue[valueType.name] ? 'есть' : 'нет'
    case 'number':
      return `${productValue[valueType.name]} ${productValue.CategoryAttribute.number_unit}`
    case 'select':
      return productValue.ValuesSelectVariant.title
    case 'string':
    default:
      return productValue[valueType.name]
  }
}

const Product = () => {
  const { productId } = useParams()

  const categoriesQuery = useCategories()
  const productQuery = useProduct({ productId })
  const [isProductEditing, setIsProductEditing] = useState(false)

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
      <table className="table">
        <tbody>
          {product.ProductValues.map(productValue => (
            <tr key={productValue.id}>
              <td>
                {productValue.CategoryAttribute.title}
              </td>
              <td>
                {getValue(productValue)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Product