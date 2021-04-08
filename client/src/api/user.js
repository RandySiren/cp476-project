import axios from 'axios'
import Cookies from 'js-cookie'

const apiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/user`,
})

apiInstance.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('__session')}`

export const getUserByID = (id) => {
  return apiInstance.get(`/${id}`)
}