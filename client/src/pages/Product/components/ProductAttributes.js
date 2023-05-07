import React from 'react'
import { usePermissions } from '../../../hooks/usePermissions'

const getValue = (productValue) => {
  const valueType = productValue.CategoryAttribute.ValueType

  switch (valueType.name) {
    case 'bool':
      return !!productValue[valueType.name] ? 'есть' : 'нет'
    case 'number':
      return `${productValue[valueType.name]} ${productValue.CategoryAttribute.number_unit}`
    case 'select':
      return productValue.ValuesSelectVariant.title
    case 'string':
    default:
      return productValue[valueType.name]
  }
}

const ProductAttributes = ({productValues, startEdit}) => {
  const permissions = usePermissions()

  return (
    <div className="">
      <table className="table">
        <tbody>
          {productValues.map(productValue => (
            <tr key={productValue.id}>
              <td>
                {productValue.CategoryAttribute.title}
              </td>
              <td>
                {getValue(productValue)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {permissions.products.update() && (
        <button 
          className='btn btn-outline-success mt-2' 
          type='button'
          onClick={() => startEdit()}
        >
          Изменить
        </button>
      )}
    </div>
  )
}

export default ProductAttributes