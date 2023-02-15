import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";

const useCategories = (id) => {
  const path = ['categories']

  if (id !== undefined) {
    path.push(id)
  }

  return useQuery(path, () => {
    if (id !== undefined) {
      return api.getData(`/categories/${id}`)
    }

    return api.getData(`/categories`)
  })
}

const useCategoryAttributes = (id) => {
  const path = ['categoryAttributes']

  path.push(id)

  return useQuery(path, () => api.getData(`/categories/attributes/${id}`), {
    enabled: !!id
  })
}

const useAddCategory = () => {
  const queryClient = useQueryClient()

  return useMutation(async category => {
    const photoUrlRes = await api.addPhoto(category.photo)

    category.photo = photoUrlRes.data.url
    
    return api.post('/categories/create', category)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories')
    },
  })
}

const useCategoryValueTypes = () => useQuery('category-value-types', () => api.getData(`/categories/value-types`))

export { useCategories, useCategoryValueTypes, useCategoryAttributes, useAddCategory }