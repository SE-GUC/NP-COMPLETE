import { combineReducers } from 'redux'

import authReducer from './authReducer'
import langReducer from './langReducer'

export default combineReducers({
  auth: authReducer,
  lang: langReducer
})
