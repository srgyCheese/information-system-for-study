import React, { useMemo } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useCategories } from '../../../queries/categoryQueries'
import getBreadcrumbArray from '../../../services/getBreadcrumbsArray'

const CategoriesBreadcrumbs = () => {
  const {isLoading, data} = useCategories()
  const {id} = useParams()

  const categories = useMemo(() => getBreadcrumbArray(data?.categories, id), [data, id])

  if (isLoading) {
    return
  }
  
  return (
    <nav className='mt-2'>
      <ol className="breadcrumb">
        <li className={`breadcrumb-item`}>
          <Link to={`/categories/`}>Категории</Link>
        </li>
        {categories.map((el, i) => (
          i == (categories.length - 1) 
          ? <li className={`breadcrumb-item`} key={el.id}>
            {el.title}
          </li>
          : <li className={`breadcrumb-item active`} key={el.id}>
            <Link to={`/categories/${el.id}`}>{el.title}</Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default CategoriesBreadcrumbs