import axios from 'axios'
import Cookies from 'js-cookie'

const apiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/user`,
})

export const postSignup = (user) => {
  return apiInstance.post(`/signup`, user)
}

export const postLogin = async (user) => {
  const res = await apiInstance.post(`/login`, user)
  if (res.status === 200) {
    const token = res.data.token
    if (token) {
      Cookies.set('__session', token)
    }
  }
}
