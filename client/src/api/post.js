import axios from 'axios'
import Cookies from 'js-cookie'

const apiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/posts`,
})

apiInstance.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('__session')}`

export const postCreatePost = (post) => {
  return apiInstance.post(`/create`, post)
}

export const getPosts = () => {
  return apiInstance.get(``)
}

export const getPostByID = (id) => {
  return apiInstance.get(`/id/${id}`)
}

export const getPostsByUserID = (id) => {
  if (id)
    return apiInstance.get(`/user/${id}`)
  else
    return apiInstance.get(`/user/me`)
}

export const deletePost = (id) => {
  return apiInstance.delete(`/id/${id}`)
}