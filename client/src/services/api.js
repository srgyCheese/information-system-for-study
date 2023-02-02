import Axios from 'axios'

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
  }

  throw error
})

export default api