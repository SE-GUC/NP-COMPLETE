import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './actionTypes'

export const addFlashMessage = (message) => dispatch => {
  dispatch({
    type: ADD_FLASH_MESSAGE,
    message: message
  })
}

export const deleteFlashMessage = (id) => dispatch => {
  dispatch({
    type: DELETE_FLASH_MESSAGE,
    id: id
  })
}
