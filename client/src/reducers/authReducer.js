import { LOGIN, LOGOUT } from '../actions/actionTypes'

const initialState = {
  isLoggedIn: false,
  error: false,
  loggedUser: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      if (action.error === false) {
        return {
          ...state,
          isLoggedIn: true,
          loggedUser: action.payload
        }
      } else {
        return {
          ...state,
          isLoggedIn: false,
          loggedUser: {}
        }
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        loggedUser: {}
      }
    default: return state
  }
}
