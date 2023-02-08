import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../../../components/Spinner'
import { PopupContext } from '../../../contexts/PopupContext'
import { useCategories, useCategoryAttributes } from '../../../queries/categoryQueries'
import api from '../../../services/api'

const InputForAttribute = ({attribute, setValue, value}) => {
  const idForLabel = `add-product-value-${attribute.id}`

  switch (attribute.ValueType.name) {
    case 'number':
      return <input 
              type='number' 
              className='form-control' 
              id={idForLabel} 
              value={value} 
              onChange={e => setValue(e.target.value)}
            />
    case 'bool':
      return <input 
              type='checkbox'
              className='form-check-input'
              id={idForLabel} 
              value={value} 
              onChange={e => setValue(!value)}
            />
    default:
      return <input 
              type='text' 
              className='form-control' 
              id={idForLabel} 
              value={value} 
              onChange={e => setValue(e.target.value)}
            />
  }
}

const AddProductAttributesForm = ({currentCategory, attributesValues, setAttributesValues}) => {
  const categoryAttributesQuery = useCategoryAttributes(currentCategory)

  if (categoryAttributesQuery.isLoading) {
    return <div className='mt-2'>
      <Spinner />
    </div>
  }

  return (
    <table class="table mt-2">
      <thead>
        <tr>
          <th scope="col">Свойство</th>
          <th scope="col">Значение</th>
        </tr>
      </thead>
      <tbody>
        {categoryAttributesQuery.data.attributes.map(attr => (
          <tr key={attr.id}>
            <td>
              <label htmlFor={`add-product-value-${attr.id}`} style={{display: 'flex', alignItems: 'center', height: '40px'}}>
                {attr.title}
              </label>
            </td>
            <td>
              <div style={{display: 'flex', alignItems: 'center', height: '40px'}}>
                <InputForAttribute 
                  attribute={attr} 
                  value={attributesValues[attr.id]} 
                  setValue={val => setAttributesValues({
                    ...attributesValues,
                    [attr.id]: val
                  })}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AddProductAttributesForm