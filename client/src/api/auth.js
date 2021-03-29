import axios from 'axios'
import Cookies from 'js-cookie'

export const postSignup = (user) => {
  return axios.post('http://localhost:8080/user/signup', user)
}

export const postLogin = (user) => {
  return axios.post('http://localhost:8080/user/login', user).then((res) => {
    if (res.status === 200) {
      const token = res.data.token
      if (token) {
        Cookies.set('__session', token)
      }
    }
  })
}
