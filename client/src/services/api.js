import Axios from 'axios'

const api = Axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use((response) => response, (error) => {
  console.log({error})

  const serverMessage = error?.response?.data?.message
  
  if (serverMessage) {
    error.message = serverMessage
  }

  throw error
})

export default api