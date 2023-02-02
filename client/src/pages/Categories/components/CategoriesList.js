import React from 'react'
import CategoryCard from './CategoryCard'

const CategoriesList = ({ categories, onDelete }) => {
  if (!categories?.length) {
    return <h5>Категорий не найдено</h5>
  }

  return (
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {categories.map(category => (
        <div className="col">
          <CategoryCard category={category} refetch={onDelete} />
        </div>
      ))}
    </div>
  )
}

export default CategoriesList