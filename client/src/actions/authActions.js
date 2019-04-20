import { LOGIN, LOGOUT } from './actionTypes'
import axios from 'axios'
import setAuthToken from '../setAuthToken'

export const login = (userData, type) => dispatch => {
  var url = ''
  switch (type) {
    case 'Investor': url = '/api/investors/login'; break
    case 'Admin': url = '/api/admins/login'; break
    case 'Lawyer': url = '/api/lawyers/login'; break
    case 'Reviewer': url = '/api/reviewers/login'; break
    default: break
  }
  axios.post(url, userData)
    .then(res => {
      const { token, id, type } = res.data
      localStorage.setItem('jwtToken', token)
      localStorage.setItem('id', id)
      localStorage.setItem('type', type)
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

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  localStorage.removeItem('id')
  localStorage.removeItem('type')
  dispatch({ type: LOGOUT })
}
