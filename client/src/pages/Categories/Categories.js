import React from 'react'
import { useNavigate, useParams } from 'react-router'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { useCategories } from '../../queries/categoryQueries'
import AddCategoryPopup from './components/AddCategoryPopup'
import CategoriesList from './components/CategoriesList'
import CategoriesBreadcrumbs from './components/CategoriesBreadcrumbs'
import { useTitle } from '../../hooks/useTitle'
import { usePermissions } from '../../hooks/usePermissions'
import ProductsSearchList from '../../components/ProductsSearchList/ProductsSearchList'
import { usePopupContext } from '../../hooks/usePopupContext'
import AddProductPopup from '../../components/AddProductPopup/AddProductPopup'

const Categories = () => {
  const {id} = useParams()

  const {isLoading, data} = useCategories()
  const navigate = useNavigate()

  const currentCategory = data?.categories?.find(el => el.id == +id)

  useTitle(id ? currentCategory?.title : 'Категории')

  const {openPopup} = usePopupContext()
  const permissions = usePermissions()

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  const currentCategoryChilds = data?.categories
    ?.filter(cat => cat.parent_category_id == id)
    ?.map(cat => ({...cat, hasChild: data.categories.findIndex(c => c.parent_category_id === cat.id) != -1}))

  return (
    <Layout>
      {data.category && <>
        <h3>{data.category.title}</h3>
      </>}
      <div className="d-flex gap-2">
        {currentCategory?.isProductCategory 
          ? <button 
              type="button"
              className="btn btn-outline-success"
              onClick={() => openPopup(<AddProductPopup category={id} />)}
            >
              Добавить товар
            </button> 
          : permissions.categories.create() && (
            <button 
              type="button" 
              className="btn btn-outline-success"
              onClick={() => openPopup(<AddCategoryPopup id={id} />)}
            >
              Добавить Категорию
            </button>
          )
        }

        {currentCategory && (
          <button 
            type="button"
            className="btn btn-outline-success"
            onClick={() => navigate(`/categories/${currentCategory.id}/edit`)}
          >
            Редактировать
          </button> 
        )}
      </div>
      <CategoriesBreadcrumbs />
      <hr/>
      {currentCategory?.isProductCategory 
        ? <ProductsSearchList category={id} />
        : <CategoriesList categories={currentCategoryChilds} />
      }
      
    </Layout>
  )
}

export default Categories