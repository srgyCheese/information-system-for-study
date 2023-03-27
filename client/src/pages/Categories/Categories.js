import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { PopupContext } from '../../contexts/PopupContext'
import { useCategories } from '../../queries/categoryQueries'
import AddCategoryPopup from './components/AddCategoryPopup'
import CategoriesList from './components/CategoriesList'
import CategoriesBreadcrumbs from './components/CategoriesBreadcrumbs'
import { useTitle } from '../../hooks/useTitle'

const Categories = () => {
  const {id} = useParams()

  const {isLoading, data} = useCategories()
  const navigate = useNavigate()

  const currentCategory = data?.categories?.find(el => el.id == +id)

  useTitle(id ? currentCategory?.title : 'Категории')

  const {openPopup} = useContext(PopupContext)

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  const currentCategoryChilds = data?.categories?.filter(cat => cat.parent_category_id == id)?.map(cat => ({...cat, hasChild: data.categories.findIndex(c => c.parent_category_id === cat.id) != -1}))

  return (
    <Layout>
      {data.category && <>
        <h3>{data.category.title}</h3>
      </>}
      {currentCategory?.isProductCategory 
        ? <button 
            type="button" 
            className="btn btn-outline-success"
            onClick={() => navigate('/products')}
          >
            Добавить Продукт
          </button> 
        : <button 
            type="button" 
            className="btn btn-outline-success"
            onClick={() => openPopup(<AddCategoryPopup id={id} />)}
          >
            Добавить Категорию
          </button>
      }
      <div className="d-flex">

      </div>
      <CategoriesBreadcrumbs />
      <hr/>
      {currentCategory?.isProductCategory 
        ? <h4>Категория с продуктами</h4>
        : <CategoriesList categories={currentCategoryChilds} />
      }
      
    </Layout>
  )
}

export default Categories