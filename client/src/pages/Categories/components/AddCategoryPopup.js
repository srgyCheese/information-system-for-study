import React, { useContext, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Popup from '../../../components/Popup'
import { PopupContext } from '../../../contexts/PopupContext'
import DeleteButton from '../../../components/DeleteButton'
import { useAddCategory, useCategories, useCategoryValueTypes } from '../../../queries/categoryQueries'

const SelectValuesArray = ({variants, setVariants}) => {
  return (
    <>
      {variants && variants?.map((variant, i) => (
        <div className='d-flex mt-2 gap-2' key={variant.id}>
          <input 
            type="text"
            className="form-control"
            placeholder="Вариант"
            value={variant.value}
            onChange={e => {
              variants[i].value = e.target.value 
              setVariants([...variants])
            }}
          />
          <DeleteButton
            onClick={e => {
              setVariants(variants.filter(el => el != variant))
            }}
          />
        </div>
      ))}
      <div className='d-grid mt-2'>
        <button 
          className="btn btn-outline-primary d-block"
          type="button"
          onClick={e => {
            variants = variants || []
            variants.push({
              id: Date.now()
            })

            setVariants(variants)
          }}
        >
          Добавить вариант
        </button>
      </div>
    </>
  )
}

const AddCategoryPopup = ({id}) => {
  const {closePopup} = useContext(PopupContext)

  const categoriesQuery = useCategories()
  const addCategory = useAddCategory()

  const [title, setTitle] = useState('')
  const [categoryValues, setCategoryValues] = useState([])
  const photoRef = useRef()
  const { data : valueTypes } = useCategoryValueTypes()

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

  const getValueType = valueTypeId => valueTypes.valueTypes.find(el => el.id == valueTypeId)

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
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Свойство</th>
                  <th scope="col">Тип</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {categoryValues.map((val, i) => (
                  <tr key={val.id}>
                    <td style={{width: '50%'}}>
                      <div style={{display: 'flex'}}>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Свойство"
                          value={val.title}
                          onChange={e => {
                            categoryValues[i].title = e.target.value

                            setCategoryValues([...categoryValues])
                          }}
                        />
                        {getValueType(val.type).name === 'number' && (
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Ед. измерения"
                            value={val.number_unit}
                            onChange={e => {
                              categoryValues[i].number_unit = e.target.value

                              setCategoryValues([...categoryValues])
                            }}
                            style={{width: '20%', marginLeft: '10px'}}
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <select 
                        className="form-select"
                        value={val.type}
                        onChange={e => {
                          categoryValues[i].type = e.target.value

                          setCategoryValues([...categoryValues])
                        }}
                      >
                        {valueTypes.valueTypes?.map(el => <option key={el.id} value={el.id}>{el.title}</option>)}
                      </select>
                      {getValueType(val.type).name == 'select' && (
                        <SelectValuesArray 
                          variants={val?.variants}
                          setVariants={(variants) => {
                            categoryValues[i].variants = variants
                            setCategoryValues([...categoryValues])
                          }}
                        />
                      )}
                    </td>
                    <td style={{width: '60px'}}>
                      <DeleteButton 
                        onClick={e => setCategoryValues(categoryValues.filter(el => el.id != val.id))}
                      />
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
        <button type="submit" className="btn btn-success mt-4" disabled={addCategory.isLoading}>
          {addCategory.isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
          Создать
        </button>
      </form>
    </Popup>
  )
}

export default AddCategoryPopup