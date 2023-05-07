import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useCategoryValueTypes } from '../../../queries/categoryQueries'
import Spinner from '../../../components/Spinner'
import DeleteButton from '../../../components/DeleteButton'

const SelectValuesArray = ({ variants, setVariants }) => {
  return (
    <div>
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
    </div>
  )
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const CategoryAttributesTable = ({ categoryValues, setCategoryValues }) => {
  const valueTypesQuery = useCategoryValueTypes()

  if (valueTypesQuery.isLoading) {
    return <Spinner />
  }

  const { valueTypes } = valueTypesQuery?.data

  const getValueType = valueTypeId => valueTypes.find(el => el.id == valueTypeId)

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Свойство</th>
            <th scope="col">Тип</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={(result) => {
          if (!result.destination) {
            return
          }

          const items = reorder(
            categoryValues,
            result.source.index,
            result.destination.index
          )

          setCategoryValues(items)
        }}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <tbody
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {categoryValues.map((val, i) => (
                  <Draggable key={val.id} draggableId={`${val.id}`} index={i}>
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{...provided.draggableProps.style, backgroundColor: 'white', borderRadius: '8px'}}
                      >
                        <td style={{ width: '50%' }}>
                          <div style={{ display: 'flex' }}>
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
                                style={{ width: '20%', marginLeft: '10px' }}
                              />
                            )}
                          </div>
                        </td>
                        <td style={{width: '100%'}}>
                          <select
                            className="form-select"
                            value={val.type}
                            onChange={e => {
                              setCategoryValues(categoryValues.with(i, {
                                ...categoryValues[i],
                                type: e.target.value
                              }))
                            }}
                          >
                            {valueTypes?.map(el => <option key={el.id} value={el.id}>{el.title}</option>)}
                          </select>
                          {getValueType(val.type).name == 'select' && (
                            <SelectValuesArray
                              variants={val?.variants}
                              setVariants={(variants) => {
                                setCategoryValues(categoryValues.with(i, {
                                  ...categoryValues[i],
                                  variants
                                }))
                              }}
                            />
                          )}
                        </td>
                        <td style={{ width: '60px' }}>
                          <DeleteButton
                            onClick={e => setCategoryValues(categoryValues.filter(el => el.id != val.id))}
                          />
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
      <button
        className="btn btn-primary d-block"
        type="button"
        onClick={e => setCategoryValues(state => [...state, { id: Date.now(), type: valueTypes[0].id }])}
      >
        Добавить свойство
      </button>
    </div>
  )
}

export default CategoryAttributesTable