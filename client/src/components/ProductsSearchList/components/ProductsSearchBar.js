import React, { useMemo, useState } from 'react'
import { useCategories } from '../../../queries/categoryQueries'

const ProductsSearchBar = ({ searchWithOptions, isLoading, initOptions }) => {
  const [category, setCategory] = useState(initOptions.category)
  const [title, setTitle] = useState(initOptions.title)

  const categoriesQuery = useCategories()

  const productCategories = useMemo(
    () => categoriesQuery.data?.categories?.filter(cat => cat.isProductCategory),
    [categoriesQuery.data?.categories]
  )

  const submitHander = e => {
    e.preventDefault()

    searchWithOptions({
      category,
      title
    })
  }

  return (
    <div className="mb-3">
      <form className='d-flex gap-2' onSubmit={submitHander}>
        <input
          className='form-control'
          placeholder='Название'
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{width: '200%'}}
        />
        <select
          className="form-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value={null}> </option>
          {productCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.title}</option>
          ))}
        </select>
        <button
          className='btn btn-primary d-flex align-items-center'
          type='submit'
          disabled={isLoading}
        >
          {isLoading && <span className="spinner-border spinner-border-sm me-2 "></span>}
          Найти
        </button>
      </form>
    </div>
  )
}

export default ProductsSearchBar