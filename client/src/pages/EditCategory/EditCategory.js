import React, { useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { toast } from 'react-toastify'
import { useTitle } from '../../hooks/useTitle'
import { useCategories, useDeleteCategory, useUpdateCategory } from '../../queries/categoryQueries'

const EditCategory = () => {
  const { categoryId } = useParams()
  
  const navigate = useNavigate()
  const location = useLocation()

  const photoRef = useRef()
  const allCategoriesQuery = useCategories()

  const categoryQuery = useCategories(categoryId)

  useTitle(categoryQuery?.data?.category?.title ? `Изменить ${categoryQuery?.data?.category?.title}` : `Изменение категории`)
  
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const [editedCategory, setEditedCategory] = useState({})

  if (categoryQuery.isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  const submitHandler = e => {
    e.preventDefault()

    if (!(editedCategory?.title || editedCategory?.parent_category_id != undefined || photoRef.current?.files?.[0])) {
      return toast('Не введены поля', {
        type: 'error'
      })
    }

    let newParentCategory = editedCategory?.parent_category_id || category.parent_category_id
    newParentCategory = newParentCategory == 0 ? null : newParentCategory

    updateCategory.mutate({
      ...editedCategory,
      id: category.id,
      photo: photoRef.current?.files?.[0],
      parent_category_id: newParentCategory,
    }, {
      onSuccess: () => navigate(`/categories/${newParentCategory ? newParentCategory : ''}`)
    })
  }

  const deleteHandle = e => {
    deleteCategory.mutate(categoryId, {
      onSuccess: () => navigate(location.state.redirectOnDelete || -1)
    })
  }

  const category = categoryQuery?.data?.category

  if (!category?.id) {
    return navigate('/categories')
  }
  
  const parentCategoriesVariants = allCategoriesQuery.data.categories.filter(cat => !cat.isProductCategory && cat.id !== category.id)

  return (
    <Layout>
      <form onSubmit={submitHandler}>
        <div className='mb-3'>
          <div className="card">
            <div className="card-body d-flex">
              <div>
                <img 
                  src={category.photo} 
                  style={{
                    width: '400px',
                    height: '400px',
                    objectFit: 'contain'
                  }} 
                />
                <input type='file' className='form-control mt-2' ref={photoRef} />
              </div>
              <div className='ps-4 w-100'>
                <div>Название</div>
                <input 
                  className='form-control'
                  value={editedCategory?.title || category.title}
                  onChange={e => setEditedCategory({...editedCategory, title: e.target.value})}
                />

                <div className="mt-2">Родительская категория</div>
                <select 
                  className="form-select"
                  value={editedCategory?.parent_category_id || category.parent_category_id}
                  onChange={e => setEditedCategory({...editedCategory, parent_category_id: e.target.value})}
                >
                  <option value={0}> </option>
                  {parentCategoriesVariants.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex gap-3'>
          <button
            className='btn btn-outline-success'
            type='submit'
            disabled={updateCategory.isLoading}
          >
            {updateCategory.isLoading && <span className="spinner-border spinner-border-sm me-2" />}
            Сохранить
          </button>
          <button
            className='btn btn-outline-danger'
            type='button'
            onClick={deleteHandle}
            disabled={deleteCategory.isLoading}
          >
            {deleteCategory.isLoading && <span className="spinner-border spinner-border-sm me-2" />}
            Удалить
          </button>
          <button
            className='btn btn-outline-danger'
            type='button'
            onClick={() => navigate(-1)}
          >
            Отмена
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default EditCategory