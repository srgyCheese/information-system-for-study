import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";

const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation(async user => {
    const photoUrlRes = await api.addPhoto(user.photo)

    user.photo = photoUrlRes.data.url

    return api.post('/users/create', user)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}

const useUsers = () => {
  const path = ['users']

  return useQuery(path, () => {
    return api.getData(`/users/`)
  })
}

const useUser = (id, params) => {
  const path = ['users', id]

  return useQuery(path, () => {
    return api.getData(`/users/${id}`)
  }, params)
}

const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation(async user => {
    return api.put(`/users/${user.id}`, user)
  }, {
    onSuccess: data => {
      queryClient.setQueryData(['users', data.user?.id], data?.data?.user)
      // queryClient.invalidateQueries('users')
    },
  })
}

const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation(async userId => {
    return api.delete(`/users/${userId}`)
  }, {
    onSuccess: data => {
      queryClient.invalidateQueries('users')
    },
  })
}

export {
  useAddUser,
  useUsers,
  useUser,
  useUpdateUser,
  useDeleteUser
}