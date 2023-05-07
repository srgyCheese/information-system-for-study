const getAttributesValues = productValues => {
  const attributesValues = {}

  productValues.forEach(val => {
    const valueType = val.CategoryAttribute.ValueType.name
    attributesValues[val.CategoryAttribute.id] = val[valueType]
  })

  return attributesValues
}

module.exports = {getAttributesValues}