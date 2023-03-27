import { useMutation, useQuery, useQueryClient } from "react-query"
import api from "../services/api"

const useAddProductItems = () => {
  const queryClient = useQueryClient()

  return useMutation(async ({productId, quantity, warehouseId}) => {
    return api.post('/product-items/create', {productId, quantity, warehouseId})
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('product-items')
    },
  })
}

const useProductItems = ({warehouseId}) => {
  const path = ['product-items', {
    warehouseId
  }]
  
  return useQuery(path, () => {
    return api.getData(`/product-items`, {
      params: {
        warehouse_id: warehouseId
      }
    })
  })
}

export {
  useAddProductItems,
  useProductItems
}