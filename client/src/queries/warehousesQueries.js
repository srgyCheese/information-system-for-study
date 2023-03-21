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

export {
    useAddWarehouse,
    useWarehouses,
}