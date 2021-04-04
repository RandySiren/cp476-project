import axios from 'axios'
import Cookies from 'js-cookie'

const apiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}posts`,
})

apiInstance.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('__session')}`

export const postCreatePost = (post) => {
  return apiInstance.post(`/create`, post)
}

export const getPosts = (post) => {
  return apiInstance.get(``)
}
