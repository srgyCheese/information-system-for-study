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

export {
  useAddUser,
  useUsers,
  useUser
}