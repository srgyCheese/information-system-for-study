import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Layout from '../../components/Layout'
import Spinner from '../../components/Spinner'
import { useCategories } from '../../queries/categoryQueries'
import api from '../../services/api'

const CreateCategory = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { isLoading, data, refetch } = useCategories(id)
  const [title, setTitle] = useState('')

  const submitHandler = async e => {
    e.preventDefault()

    try {
      const newCategory = await api.post('/categories/create', {
        title,
        parent_category_id: id
      })

      refetch()

      navigate(`/categories${id ? `/${id}` : ''}`)
    } catch (e) {}
  }

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  return (
    <Layout>
      {data.category ? (
        <h3>Добавление подкатегории к {data.category.title}</h3>
      ) : (
        <h3>Добавление новой категории</h3>
      )}

      <hr />

      <form onSubmit={submitHandler}>
        <div className="form-outline mb-4">
          <label className="form-label">Название</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <button type="submit" className="btn btn-primary">Добавить</button>
      </form>
    </Layout>
  )
}

export default CreateCategory