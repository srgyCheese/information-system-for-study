import { useMutation, useQuery, useQueryClient } from "react-query"
import api from "../services/api"

const useProducts = (params) => {
  const path = ['products']

  if (params !== undefined) {
    path.push(params)
  }

  return useQuery(path, () => {
    return api.getData(`/products/`, {
      params
    })
  })
}

const useAddProduct = () => {
  const queryClient = useQueryClient()

  return useMutation(async product => {
    const photoUrlRes = await api.addPhoto(product.photos[0])

    product.photos = [photoUrlRes.data.url]
    
    return api.post('/products/create', product)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    },
  })
}

const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation(async productId => {
    return api.delete(`/products/${productId}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    },
  })
}

const useProduct = ({productId}) => {
  return useQuery(['products', productId], () => {
    return api.getData(`/products/${productId}`)
  })
}

export { useProducts, useAddProduct, useDeleteProduct, useProduct }