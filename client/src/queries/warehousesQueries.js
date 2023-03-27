import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";

const useAddWarehouse = () => {
  const queryClient = useQueryClient()

  return useMutation(async warehouse => {
    return api.post('/warehouses/create', warehouse)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('warehouses')
    },
  })
}

const useWarehouses = () => {
  const path = ['warehouses']

  return useQuery(path, () => {
    return api.getData(`/warehouses/`)
  })
}

const useWarehouse = (id) => {
  const path = ['warehouses', id]

  return useQuery(path, () => {
    return api.getData(`/warehouses/${id}`)
  })
}

export {
  useAddWarehouse,
  useWarehouses,
  useWarehouse,
}