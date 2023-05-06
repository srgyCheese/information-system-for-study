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
  const path = ['warehouses', +id]

  return useQuery(path, () => {
    return api.getData(`/warehouses/${id}`)
  })
}

const useUpdateWarehouse = () => {
  const queryClient = useQueryClient()

  return useMutation(async warehouse => {
    return api.put(`/warehouses/${warehouse.id}`, warehouse)
  }, {
    onSuccess: ({data}) => {
      queryClient.setQueryData(['warehouses', +data.warehouse?.id], data)
      queryClient.invalidateQueries('warehouses')
    },
  })
}

const useDeleteWarehouse = () => {
  const queryClient = useQueryClient()

  return useMutation(async warehouseId => {
    return api.delete(`/warehouses/${warehouseId}`)
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries('warehouses')
    },
  })
}

export {
  useAddWarehouse,
  useWarehouses,
  useWarehouse,
  useUpdateWarehouse,
  useDeleteWarehouse
}