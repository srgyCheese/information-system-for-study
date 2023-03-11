import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCategories } from '../../../queries/categoryQueries'
import getBreadcrumbArray from '../../../services/getBreadcrumbsArray'
import { useProduct } from '../../../queries/productsQueries'

const ProductBreadcrumbs = ({ productId }) => {
  const { isLoading, data } = useCategories()

  const productQuery = useProduct({productId})
  
  const {product} = productQuery?.data

  const categories = useMemo(() => getBreadcrumbArray(data?.categories, product?.CategoryId), [data, product?.CategoryId])

  if (isLoading || productQuery.isLoading) {
    return
  }

  return (
    <nav className='mt-2'>
      <ol className="breadcrumb">
        <li className={`breadcrumb-item`}>
          <Link to={`/categories/`}>Категории</Link>
        </li>
        {categories.map((el, i) => (
          <li className={`breadcrumb-item active`} key={el.id}>
            <Link to={`/categories/${el.id}`}>
                {el.title}
            </Link>
          </li>
        ))}
        <li className='breadcrumb-item active'>
          {product?.title}
        </li>
      </ol>
    </nav>
  )
}

export default ProductBreadcrumbs