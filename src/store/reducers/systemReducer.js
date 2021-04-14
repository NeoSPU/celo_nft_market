// THEME_SAVE
import {
    THEME_SAVE,
    START_INDEX,
    GET_IMAGE,
    GET_PERMISSIONS,
    CLEAR_SELECTED_IMAGE
  } from '../../services/types/reduxTypes'
  
  const initialState = {
    isDarkTheme: false,
    isPermissions: false,
    image_uri: null
  }
  
  export const systemReducer = (state = initialState, action) => {
    switch (action.type) {
      case THEME_SAVE:
        return {
          ...state,
          isDarkTheme: action.payload
        }
      case START_INDEX:
        return {
          ...state,
          startIndex: action.payload
        }
      case GET_IMAGE:
        return {
          ...state,
          image_result: action.payload
        }
      case GET_PERMISSIONS:
        return {
          ...state,
          isPermissions: action.payload
        }
      case CLEAR_SELECTED_IMAGE:
        console.log(`Reducer Clear`)
        return {
          ...state,
          image_result: ''
        }
      default:
        return state
    }
  }
  