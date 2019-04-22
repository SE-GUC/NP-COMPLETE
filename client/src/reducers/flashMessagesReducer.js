import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/actionTypes'
const uuidv4 = require('uuid/v4')

const initialState = {
  messages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      console.log('In add message reducer')
      return {
        ...state,
        messages: [
          {
            ...action.message,
            id: uuidv4()
          }
        ]
      }
    case DELETE_FLASH_MESSAGE:
      return {
        messages: []
      }
    default: return state
  }
}
