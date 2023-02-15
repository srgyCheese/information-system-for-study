import Axios from 'axios'
import { toast } from 'react-toastify'

const api = Axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.__proto__.getData = (...args) => api.get(...args).then(res => res?.data)
api.__proto__.addPhoto = async photo => {
  const formData = new FormData()

  formData.append('photo', photo)

  return await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

api.interceptors.response.use((response) => response, (error) => {
  const serverMessage = error?.response?.data?.message

  if (serverMessage) {
    error.message = serverMessage

    toast(serverMessage, {
      type: 'error'
    })
  }

  throw error
})

export default api