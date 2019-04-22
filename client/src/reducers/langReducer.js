import { CHANGE_LANGUAGE } from '../actions/actionTypes'

const initialState = {
  language: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload
      }
    default: return state
  }
}
