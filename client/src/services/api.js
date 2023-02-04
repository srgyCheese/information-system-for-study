import Axios from 'axios'
import { toast } from 'react-toastify'

const api = Axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.__proto__.getData = (...args) => api.get(...args).then(res => res?.data)

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