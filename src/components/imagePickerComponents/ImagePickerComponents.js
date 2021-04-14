import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getPermissions,
  getImageFromCameraRoll,
  clearSelectedImage
} from '../../store/actions/systemAction'

import { View, StyleSheet } from 'react-native'

import {
  Paragraph,
  Card,
  FAB,
  Avatar,
  Title,
  useTheme
} from 'react-native-paper'

import { BROWSE_TITLE } from '../../themes/titles'
import { styles } from './styles'

export const ImagePickerComponents = ({ onSelectedImage, onClear, onCreateNFT }) => {
  const dispatch = useDispatch()
  const theme = useTheme()

  const [pickImageState, setPickImageState] = useState(false)
  const [imageURIState, setImageURIState] = useState(null)
  const [isPermissionsState, setIsPermissionsState] = useState(false)

  const [cleartate, setClearState] = useState(false)

  const isPermissions = useSelector(
    (state) => state.systemReducer.isPermissions
  )

  const image_uri = useSelector((state) => state.systemReducer.image_result)

  useEffect(() => {
    let didCancel = false
    if (!didCancel) {
      dispatch(getPermissions())
    }
    return () => {
      didCancel = true
    }
  }, [])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && cleartate) {
      dispatch(clearSelectedImage())
      setImageURIState(null)
    }
    setClearState(false)
    return () => {
      didCancel = true
    }
  }, [cleartate])

  useEffect(() => {
    let didCancel = false
    if (!didCancel) {
      setIsPermissionsState(isPermissions)
    }
    return () => {
      didCancel = true
    }
  }, [isPermissions])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && image_uri) {
      setImageURIState(image_uri)
      selectedHandler()
    }
    return () => {
      didCancel = true
    }
  }, [image_uri])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && pickImageState) {
      dispatch(getImageFromCameraRoll())
    }
    setPickImageState(false)
    return () => {
      didCancel = true
    }
  }, [pickImageState])

  const pickImage = () => {
    setPickImageState(true)
  }

  const selectedHandler = () => {
    onSelectedImage(imageURIState)
  }

  const clearHandler = () => {
    setClearState(true)
    onClear()
  }

  const createNFTHandler = () => {
    onCreateNFT()
  }

  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Card.Content style={styles(theme).card_content}>
      <FAB
        style={styles(theme).fab_link}
        icon="plus"
        color={theme.colors.text}
        label={BROWSE_TITLE.FAB_TITLE_CHOICE_IMAGE}
        onPress={() => pickImage()}
      />
      <FAB
        style={styles(theme).fab_link}
        label={BROWSE_TITLE.FAB_TITLE_CLEAR}
        color={theme.colors.text}
        disabled={false}
        onPress={() => clearHandler()}
      />
      <FAB
        style={styles(theme).fab_link}
        label={BROWSE_TITLE.FAB_TITLE}
        color={theme.colors.text}
        disabled={false}
        onPress={() => createNFTHandler()}
      />
    </Card.Content>
  )
}
