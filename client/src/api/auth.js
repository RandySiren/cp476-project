import axios from 'axios'
import Cookies from 'js-cookie'

export const postSignup = (user) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}user/signup`, user)
}

export const postLogin = (user) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}user/login`, user).then((res) => {
    if (res.status === 200) {
      const token = res.data.token
      if (token) {
        Cookies.set('__session', token)
      }
    }
  })
}