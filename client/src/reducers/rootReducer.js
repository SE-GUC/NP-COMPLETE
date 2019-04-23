import { combineReducers } from 'redux'

import authReducer from './authReducer'
import langReducer from './langReducer'
import flashMessagesReducer from './flashMessagesReducer'

export default combineReducers({
  auth: authReducer,
  lang: langReducer,
  flash: flashMessagesReducer
})
