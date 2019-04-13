import { LOGIN } from './actionTypes'
import axios from 'axios'

import setAuthToken from '../setAuthToken'

export const login = (userData) => dispatch => {
  axios.post('http://localhost:5000/api/users/login', userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
    })
    .catch(err => console.log('error'))
}


// local storage ??????????????????????????????/