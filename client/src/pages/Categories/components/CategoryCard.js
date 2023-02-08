import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import {ReactComponent as TrashIcon} from '../../../svg/trash.svg'
import api from '../../../services/api'
import { useCategories } from '../../../queries/categoryQueries'

const CategoryCard = ({ category }) => {
  const navigate = useNavigate()
  const {refetch} = useCategories()

  const [loading, setLoading] = useState(false)

  const deleteCategory = async () => {
    setLoading(true)
    try {
      await api.delete(`/categories/${category.id}`)
      await refetch()
    } catch (e) {}

    setLoading(false)
  }

  return (
    <div 
      className="card border-light shadow-sm mb-3"
      style={{minHeight: '75px'}}
    >
      <img 
        src={category.photo} 
        className="bd-placeholder-img card-img-top cursor-pointer" 
        onClick={() => navigate(`/categories/${category.id}`)} 
        style={{height: '100%', objectFit: 'cover'}}
      />
      <div className="card-body d-flex align-items-center">
        <div className="d-flex justify-content-between align-items-center w-100">
          <h5 
            onClick={() => navigate(`/categories/${category.id}`)} 
            className="card-title cursor-pointer m-0"
          >
            {category.title}
          </h5>
          {!category.hasChild && <button 
            className="btn btn-danger p-2"
            onClick={deleteCategory}
            disabled={loading}
          >
            <div style={{ height: '24px', width: '24px' }}>
              {loading 
                ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                : <TrashIcon width="24" />
              }
            </div>
          </button>}
        </div>
      </div>
    </div>
  )
}

export default CategoryCard