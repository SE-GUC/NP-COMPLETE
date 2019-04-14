import axios from 'axios'

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
    console.log(axios.defaults.headers)
  } else {
    console.log('no token :(')
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
