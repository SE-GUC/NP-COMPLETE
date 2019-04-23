import { CHANGE_LANGUAGE } from './actionTypes'

export const changeLanguage = (language) => dispatch => {
  var langi = ''
  if (language.language === 'English') {
    localStorage.setItem('language', 'Arabic')
    langi = 'Arabic'
  } else {
    localStorage.setItem('language', 'English')
    langi = 'English'
  }
  dispatch({
    type: CHANGE_LANGUAGE,
    payload: langi
  })
}
