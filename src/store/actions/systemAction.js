import {
  THEME_SAVE,
  START_INDEX,
  GET_IMAGE,
  GET_PERMISSIONS,
  CLEAR_SELECTED_IMAGE
} from '../../services/types/reduxTypes'

import { Appearance } from 'react-native-appearance'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'

//=======================================================================
// IMAGE LIBRARY AND CAMERA PERMISSIONS

export const getPermissions = () => {
  return async (dispatch) => {
    try {
      if (Platform.OS !== 'web') {
        const {
          status
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          dispatch({
            type: GET_PERMISSIONS,
            payload: false
          })
        } else {
          dispatch({
            type: GET_PERMISSIONS,
            payload: true
          })
        }
      }
    } catch (e) {
      console.log('Permissions Action Error (getPermissions()): ', e)
    }
  }
}

//=======================================================================
// GET IMAGE FROM CAMERA ROLL CAMERA

export const getImageFromCameraRoll = () => {
  return async (dispatch) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })

      if (!result.cancelled) {
        dispatch({
          type: GET_IMAGE,
          payload: result.uri
        })
      } else {
        dispatch({
          type: GET_IMAGE,
          payload: null
        })
      }
    } catch (e) {
      console.log('Image Picker Action Error (getImageFromCameraRoll()): ', e)
    }
  }
}

//=======================================================================
// CLEAR IMAGE

export const clearSelectedImage = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CLEAR_SELECTED_IMAGE,
      })
    } catch (e) {
      console.log('Image Picker Action Error (getImageFromCameraRoll()): ', e)
    }
  }
}

//=======================================================================
// MAIN GET NFT ASSETS OF BROWSE

export const isDarkThemeSaved = () => {
  const appearanceTheme = Appearance.getColorScheme()
  return async (dispatch) => {
    try {
      const isDarkThemeSaved = await AsyncStorage.getItem('@theme_storage')
      if (isDarkThemeSaved !== null) {
        dispatch({
          type: THEME_SAVE,
          payload: isDarkThemeSaved
        })
      } else {
        dispatch({
          type: THEME_SAVE,
          payload: appearanceTheme === 'dark'
        })
      }
    } catch (e) {
      console.log('Theme Saved Action Error (isDarkThemeSaved()): ', e)
    }
  }
}

//=======================================================================
// START INDEX

export const setStartIndex = (index) => {
  return async (dispatch) => {
    dispatch({
      type: START_INDEX,
      payload: index
    })
  }
}
