import React, { useContext, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import Popup from '../../../components/Popup'
import { PopupContext } from '../../../contexts/PopupContext'
import { useCategories, useCategoryValueTypes } from '../../../queries/categoryQueries'
import {ReactComponent as TrashIcon} from '../../../svg/trash.svg'
import api from '../../../services/api'

const AddCategoryPopup = ({id}) => {
  const {closePopup} = useContext(PopupContext)

  const { data, refetch } = useCategories()
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [categoryValues, setCategoryValues] = useState([])
  const photoRef = useRef()
  const { isLoading,  data : valueTypes } = useCategoryValueTypes()

  const currentCategory = data?.categories?.find(el => el.id == +id)

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

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append('photo', photoRef.current.files[0])

      const photoUrlRes = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const {url} = photoUrlRes.data
      
      const newCategory = await api.post('/categories/create', {
        title,
        parent_category_id: id,
        values: isCategoryForProducts ? categoryValues : null,
        photo: url
      })

      await refetch()
      closePopup()
    } catch (e) {}
    setLoading(false)
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
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Свойство</th>
                  <th scope="col">Тип</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {categoryValues.map(val => (
                  <tr key={val.id}>
                    <td>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Свойство"
                        value={val.title}
                        onChange={e => {
                          const index = categoryValues.findIndex(el => el.id == val.id)
                          
                          const newCategoryValues = [...categoryValues]

                          newCategoryValues[index].title = e.target.value

                          setCategoryValues(newCategoryValues)
                        }}
                      />
                    </td>
                    <td>
                      <select 
                        className="form-select"
                        value={val.type}
                        onChange={e => {
                          const index = categoryValues.findIndex(el => el.id == val.id)
                          
                          const newCategoryValues = [...categoryValues]

                          newCategoryValues[index].type = e.target.value

                          setCategoryValues(newCategoryValues)
                        }}
                      >
                        {valueTypes.valueTypes?.map(el => <option key={el.id} value={el.id}>{el.title}</option>)}
                      </select>
                    </td>
                    <td style={{width: '60px'}}>
                      <button
                        className="btn btn-danger p-2"
                        type='button'
                        onClick={e => {
                          setCategoryValues(categoryValues.filter(el => el.id != val.id))
                        }}
                      >
                        <div style={{ height: '24px', width: '24px' }}>
                          <TrashIcon width="24" />
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button 
              className="btn btn-primary d-block"
              type="button"
              onClick={e => setCategoryValues(state => [...state, {id: Date.now(), type: valueTypes.valueTypes[0].id}])}
            >
              Добавить свойство
            </button>
          </div>
        )}
        <button type="submit" className="btn btn-success mt-4" disabled={loading}>
          {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
          Создать
        </button>
      </form>
    </Popup>
  )
}

export default AddCategoryPopup