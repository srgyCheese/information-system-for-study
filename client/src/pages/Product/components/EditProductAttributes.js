import React, { useMemo, useState } from 'react'
import ProductAttributesForm from '../../../components/AddProductPopup/ProductAttributesForm'
import { useUpdateProductAttribues } from '../../../queries/productsQueries'
import { toast } from 'react-toastify'

const getAttributesValues = productValues => {
  const attributesValues = {}

  productValues.forEach(val => {
    const valueType = val.CategoryAttribute.ValueType.name
    attributesValues[val.CategoryAttribute.id] = val[valueType]
  })

  return attributesValues
}

const EditProductAttributes = React.memo(({product, cancelEdit}) => {
  const initAttributesValues = useMemo(() => getAttributesValues(product.ProductValues), [product])

  const [attributesValues, setAttributesValues] = useState(initAttributesValues)
  const updateAttributes = useUpdateProductAttribues()

  const submitHandler = e => {
    e.preventDefault()

    for (let val of Object.keys(initAttributesValues)) {
      if (typeof attributesValues[val] !== 'boolean' && !attributesValues[val]) {
        return toast('Не все поля введены', {
          type: 'error'
        })
      }
    }

    updateAttributes.mutate({
      productId: product.id,
      attributesValues
    }, {
      onSuccess: cancelEdit
    })
  }

  return (
    <form onSubmit={submitHandler}>
      <ProductAttributesForm 
        currentCategory={product.CategoryId}
        attributesValues={attributesValues}
        setAttributesValues={setAttributesValues}
        tableHead={false}
      />
      <div className="d-flex gap-2">
        <button
          className='btn btn-outline-success mt-2'
          type='submit'
          disabled={updateAttributes.isLoading}
        >
          {updateAttributes.isLoading && <span className="spinner-border spinner-border-sm me-2" />}
          Сохранить
        </button>
        <button
          className='btn btn-outline-danger mt-2'
          type='button'
          onClick={e => cancelEdit()}
        >
          Отмена
        </button>
      </div>
    </form>
  )
})

export default EditProductAttributes