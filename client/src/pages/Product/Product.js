import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useProduct } from '../../queries/productsQueries'
import Spinner from '../../components/Spinner'
import { useCategories } from '../../queries/categoryQueries'
import ProductBreadcrumbs from './components/ProductBreadCrumbs'
import ProductShortCard from './components/ProductShortCard'

const Product = () => {
  const {productId} = useParams()

  const categoriesQuery = useCategories()
  const productQuery = useProduct({productId})

  if (productQuery?.isLoading || categoriesQuery.isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  const {product} = productQuery.data

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
  
  return (
    <Layout>
      <ProductBreadcrumbs productId={productId} />
      <h2>{product.title}</h2>
      <ProductShortCard product={product} />
      
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
          {/* {categoryAttributesQuery.data.attributes.map(attr => (
            <tr key={attr.id}>
              <td>
                <label htmlFor={`add-product-value-${attr.id}`} style={{display: 'flex', alignItems: 'center', height: '40px'}}>
                  {attr.title}
                </label>
              </td>
              <td>
                <div style={{display: 'flex', alignItems: 'center', height: '40px'}}>
                  <InputForAttribute
                    attribute={attr}
                    value={attributesValues[attr.id]}
                    setValue={val => setAttributesValues({
                      ...attributesValues,
                      [attr.id]: val
                    })}
                  />
                </div>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </Layout>
  )
}

export default Product