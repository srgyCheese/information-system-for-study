import { useQuery } from "react-query";
import api from "../services/api";

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

export { useProducts }