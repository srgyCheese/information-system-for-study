import React from 'react'
import { useNavigate } from 'react-router'
import api from '../../../services/api'

const CategoryCard = ({ category, onDelete }) => {
  const navigate = useNavigate()

  const deleteCategory = async () => {
    await api.delete(`/categories/${category.id}`)
    onDelete()
  }

  return (
    <div 
      className="card border-light shadow-sm mb-3" 
      style={{maxWidth: '18rem'}}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 
            onClick={() => navigate(`/categories/${category.id}`)} 
            className="card-title cursor-pointer"
          >
            {category.title}
          </h5>
          <button 
            className="btn btn-danger"
            onClick={deleteCategory}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard