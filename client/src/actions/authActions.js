import { LOGIN, LOGOUT, DELETE_FLASH_MESSAGE } from './actionTypes'
import axios from 'axios'
import setAuthToken from '../setAuthToken'

export const login = (userData, type) => dispatch => {
  console.log(`/api/${type}/login`)
  axios.post(`/api/${type}/login`, userData)
    .then(res => {
      const { token, id, type } = res.data
      localStorage.setItem('jwtToken', token)
      localStorage.setItem('id', id)
      localStorage.setItem('type', type)
      setAuthToken(token)
      dispatch({
        type: LOGIN,
        error: false,
        payload: res.data
      })
      dispatch({
        type: DELETE_FLASH_MESSAGE
      })
    })
    .catch(err => {
      dispatch({
        type: LOGIN,
        error: true,
        payload: err
      })
      dispatch({
        type: DELETE_FLASH_MESSAGE
      })
    })
}

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  localStorage.removeItem('id')
  localStorage.removeItem('type')
  dispatch({ type: LOGOUT })
}
