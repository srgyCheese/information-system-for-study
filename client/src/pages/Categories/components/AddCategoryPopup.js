import React, { useContext, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Popup from '../../../components/Popup'
import { PopupContext } from '../../../contexts/PopupContext'
import DeleteButton from '../../../components/DeleteButton'
import { useAddCategory, useCategories, useCategoryValueTypes } from '../../../queries/categoryQueries'
import CategoryAttributesTable from './CategoryAttributesTable'

const AddCategoryPopup = ({id}) => {
  const {closePopup} = useContext(PopupContext)

  const categoriesQuery = useCategories()
  const addCategory = useAddCategory()

  const [title, setTitle] = useState('')
  const [categoryValues, setCategoryValues] = useState([])
  const photoRef = useRef()

  const currentCategory = categoriesQuery?.data?.categories?.find(el => el.id == +id)

  const [isCategoryForProducts, setIsCategoryForProducts] = useState(false)

  const submitHandler = async e => {
    e.preventDefault()

    if (!title.trim()) {
      return toast('Не введено название категории', {
        type: 'error'
      })
    }

    if (!photoRef.current?.files?.length) {
      return toast('Нет фото категории', {
        type: 'error'
      })
    }

    addCategory.mutate({
      title,
      photo: photoRef.current.files[0],
      parent_category_id: id,
      values: isCategoryForProducts ? categoryValues : null,
    }, {
      onSuccess: closePopup
    })
  }

  return (
    <Popup title={`Добавление категории${currentCategory?.title ? ` к ${currentCategory.title}` : ''}`}>
      <form onSubmit={submitHandler}>
        <div className="form-outline">
          <label className="form-label">Фото категории</label>
          <div className="mb-3">
            <input 
              className="form-control" 
              type="file" 
              id="formFile"
              accept=".jpg, .jpeg, .png"
              ref={photoRef}
            />
          </div>
        </div>
        <div className="form-outline">
          <label className="form-label">Название</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="form-check form-switch mt-2">
          <input 
            className="form-check-input"
            type="checkbox" 
            id="flexSwitchCheckDefault"
            checked={isCategoryForProducts}
            onChange={e => setIsCategoryForProducts(!isCategoryForProducts)}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Категория для товаров</label>
        </div>
        {isCategoryForProducts && (
          <CategoryAttributesTable 
            categoryValues={categoryValues}
            setCategoryValues={setCategoryValues}
          />
        )}
        <button type="submit" className="btn btn-success mt-4" disabled={addCategory.isLoading}>
          {addCategory.isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
          Создать
        </button>
      </form>
    </Popup>
  )
}

export default AddCategoryPopup