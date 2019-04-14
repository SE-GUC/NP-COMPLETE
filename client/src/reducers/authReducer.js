import { LOGIN } from '../actions/actionTypes'

const initialState = {
  isLoggedIn: false,
  loggedUser: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        loggedUser: action.payload
      }
    default: return state
  }
}
