import React, { useState } from 'react'
import DeleteButton from '../../../components/DeleteButton'
import EditButton from '../../../components/EditButton'
import { usePermissions } from '../../../hooks/usePermissions'
import { useLocation, useNavigate } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  const navigate = useNavigate()
  const permissions = usePermissions()

  return (
    <div
      className="card border-light shadow-sm mb-3"
      style={{ minHeight: '75px' }}
    >
      <img
        src={category.photo}
        className="bd-placeholder-img card-img-top cursor-pointer"
        onClick={() => navigate(`/categories/${category.id}`)}
        style={{ height: '100%', objectFit: 'cover' }}
      />
      <div className="card-body">
        <div className='d-flex align-items-center'>
          <div className="d-flex justify-content-between align-items-center w-100">
            <h5
              onClick={() => navigate(`/categories/${category.id}`)}
              className="card-title cursor-pointer m-0"
            >
              {category.title}
            </h5>
            
            <div className="d-flex gap-1">
              {permissions.categories.update() && (
                <EditButton 
                  onClick={() => navigate(`/categories/${category.id}/edit`)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard