import { LOGIN } from './actionTypes'
import axios from 'axios'
import setAuthToken from '../setAuthToken'

export const login = (userData) => dispatch => {
  console.log('logging in')
  console.log(userData)
  axios.post('/api/investors/login', userData)
    .then(res => {
      const { token, id, type } = res.data
      localStorage.setItem('jwtToken', token)
      localStorage.setItem('id', id)
      localStorage.setItem('type', type)
      console.log(localStorage)
      setAuthToken(token)
      dispatch({
        type: LOGIN,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
}
