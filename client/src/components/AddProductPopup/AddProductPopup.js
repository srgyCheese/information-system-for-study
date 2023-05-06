import React, { useContext, useRef, useState } from 'react'
import AddProductAttributesForm from './components/AddProductAttributesForm'
import { toast } from 'react-toastify'
import { useAddProduct } from '../../queries/productsQueries'
import { useCategories } from '../../queries/categoryQueries'
import { PopupContext } from '../../contexts/PopupContext'
import Popup from '../Popup'
import Spinner from '../Spinner'

const AddProductPopup = ({category}) => {
  const { closePopup } = useContext(PopupContext)

  const addProduct = useAddProduct()
  const [currentCategory, setCurrentCategory] = useState(category)
  const [attributesValues, setAttributesValues] = useState({})

  const [price, setPrice] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const photoRef = useRef()

  const categoriesQuery = useCategories()

  if (categoriesQuery.isLoading) {
    return <Popup title={`Создание товара`}>
      <Spinner />
    </Popup>
  }

  const productCategories = categoriesQuery.data.categories.filter(cat => cat.isProductCategory)

  const submitHandler = async e => {
    e.preventDefault()

    if (!title.trim()) {
      return toast('Не введено название', {
        type: 'error'
      })
    }

    if (!photoRef.current?.files?.length) {
      return toast('Нет фото', {
        type: 'error'
      })
    }

    if (!price) {
      return toast('Не введена цена', {
        type: 'error'
      })
    }

    if (!description) {
      return toast('Не введено описание', {
        type: 'error'
      })
    }

    addProduct.mutate({
      price,
      title,
      description,
      category_id: currentCategory,
      attributesValues,
      photos: [photoRef.current.files[0]]
    }, {
      onSuccess: closePopup
    })
  }

  return (
    <Popup title={`Создание товара`}>
      <form onSubmit={submitHandler}>
        {!category && (
          <select 
            className="form-select mb-3"
            onChange={e => setCurrentCategory(e.target.value)}
          >
            <option value={null}> </option>
            {productCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            ))}
          </select>
        )}

        {currentCategory && <>
          <div className="mb-3 row">
            <div className="col-sm-2 col-form-label">Название</div>
            <div className="col-sm-10">
              <input 
                className="form-control" 
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 mt-3 row">
            <div className="col-sm-2 col-form-label">Описание</div>
            <div className="col-sm-10">
              <textarea 
                className="form-control" 
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 mt-3 row">
            <div className="col-sm-2 col-form-label">Фото</div>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="file"
                id="formFile"
                ref={photoRef}
                accept=".jpg, .jpeg, .png"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-sm-2 col-form-label">Цена</div>
            <div className="col-sm-10">
              <input 
                className="form-control" 
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </div>
          <AddProductAttributesForm
            currentCategory={currentCategory}
            attributesValues={attributesValues}
            setAttributesValues={setAttributesValues}
          />
        </>}

        <button type="submit" className="btn btn-success mt-4" disabled={addProduct.isLoading}>
          {addProduct.isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
          Создать
        </button>
      </form>
    </Popup>
  )
}

export default AddProductPopup