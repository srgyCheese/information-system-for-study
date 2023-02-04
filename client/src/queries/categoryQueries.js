import { useQuery } from "react-query";
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

const useCategoryValueTypes = () => useQuery('category-value-types', () => api.getData(`/categories/value-types`))

export { useCategories, useCategoryValueTypes }