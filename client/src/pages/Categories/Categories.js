import React from 'react'
import { useNavigate, useParams } from 'react-router'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { useCategories } from '../../queries/categoryQueries'
import CategoriesList from './components/CategoriesList'

const Categories = () => {
  const {id} = useParams()

  const {isLoading, data, refetch} = useCategories(id)
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  return (
    <Layout>
      {data.category && <>
        <h3>{data.category.title}</h3>
      </>}
      <button 
        type="button" 
        className="btn btn-outline-success"
        onClick={() => navigate(`/categories${id ? `/${id}` : ''}/create`)}
      >
        Добавить Категорию
      </button>
      <div className="d-flex">

      </div>
      <hr/>
      <CategoriesList categories={data.categories} onDelete={refetch} />
    </Layout>
  )
}

export default Categories