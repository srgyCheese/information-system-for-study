import React from 'react'
import CategoryCard from './CategoryCard'

const CategoriesList = ({ categories }) => {
  if (!categories?.length) {
    return <h5>Нет категорий</h5>
  }

  return (
    <div className="row">
      {categories.map(category => (
        <div className="col col-lg-3 mb-3 d-flex align-items-stretch" key={category.id}>
          <CategoryCard category={category} />
        </div>
      ))}
    </div>
  )
}

export default CategoriesList