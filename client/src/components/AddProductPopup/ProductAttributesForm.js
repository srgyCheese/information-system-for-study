import React  from 'react'
import Spinner from '../Spinner'
import { useCategoryAttributes } from '../../queries/categoryQueries'

const InputForAttribute = ({attribute, setValue, value}) => {
  const idForLabel = `add-product-value-${attribute.id}`

  switch (attribute.ValueType.name) {
    case 'number':
      return <>
        <input 
          type='number' 
          className='form-control' 
          id={idForLabel} 
          value={value} 
          onChange={e => setValue(e.target.value)}
        />
        <div className='ms-3 fw-bold'>{attribute.number_unit}</div>
      </>
    case 'bool':
      return (
        <input 
          type='checkbox'
          className='form-check-input'
          id={idForLabel} 
          checked={value} 
          onChange={e => setValue(!value)}
        />
      )
    case 'select':
      return (
        <select 
          className="form-select"
          value={value}
          onChange={e => setValue(e.target.value)}
        >
          <option value={null}> </option>
          {attribute.ValuesSelectVariants.map(variant => (
            <option key={variant.id} value={variant.id}>{variant.title}</option>
          ))}
        </select>
      )
    default:
      return (
        <input 
          type='text' 
          className='form-control' 
          id={idForLabel} 
          value={value} 
          onChange={e => setValue(e.target.value)}
        />
      )
  }
}

const ProductAttributesForm = ({currentCategory, attributesValues, setAttributesValues, tableHead = true}) => {
  const categoryAttributesQuery = useCategoryAttributes(currentCategory)

  if (categoryAttributesQuery.isLoading) {
    return <div className='mt-2'>
      <Spinner />
    </div>
  }

  return (
    <table className="table mt-2">
      {tableHead && (
        <thead>
          <tr>
            <th scope="col">Свойство</th>
            <th scope="col">Значение</th>
          </tr>
        </thead>
      )}
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

export default ProductAttributesForm