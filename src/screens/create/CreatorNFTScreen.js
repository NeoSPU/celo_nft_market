import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'

import { View, Dimensions } from 'react-native'
import {
  Card,
  FAB,
  Avatar,
  Title,
  useTheme
} from 'react-native-paper'

import { loginCeloWallet } from '../../store/actions/celoNetworkAction'

import { BROWSE_TITLE } from '../../themes/titles'
import {
  LOGO_BW,
  VALORA_LIGHT
} from '../../components/imageComponents/ImageToIcon'
import { LOGIN_MODAL_TITLE } from '../../themes/titles'
import { STACK_SCENES } from '../../services/types/sceneTypes'
import { ImagePickerComponents } from '../../components/imagePickerComponents/ImagePickerComponents'
import { clearSelectedImage } from '../../store/actions/systemAction'
import { createNewNFT } from '../../store/actions/celoNetworkAction'

import { styles } from './styles'

const { width, height } = Dimensions.get('window')

export const CreatorNFTScreen = ({ navigation }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [getValoraLoginState, setGetValoraLoginState] = useState(false)
  const [toLoginScreenState, setToLoginScreenState] = useState(false)
  const [conectedWalletState, setConectedWalletState] = useState({
    address: 'Not logged in',
    phoneNumber: 'Not logged in',
    cUSDBalance: 'Not logged in',
    isLoadingBalance: false
  })
  const [imageURIState, setImageURIState] = useState(null)
  const [imageSelectedState, setImageSelectedState] = useState(false)
  const [clearState, setClearState] = useState(false)

  const [creteNFTState, setCreteNFTState] = useState(false)


  const connectedWallet = useSelector(
    (state) => state.celoNetworkReducer.connectedWallet
  )

  const image_uri = useSelector((state) => state.systemReducer.image_result)

  useEffect(() => {
    let didCancel = false
    if (!didCancel) {
      setImageURIState(image_uri)
    }
    return () => {
      didCancel = true
    }
  }, [])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && getValoraLoginState) {
      dispatch(loginCeloWallet())
    }
    setGetValoraLoginState(false)
    return () => {
      didCancel = true
    }
  }, [getValoraLoginState])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && connectedWallet) {
      setConectedWalletState(connectedWallet)
    }
    return () => {
      didCancel = true
    }
  }, [connectedWallet])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && toLoginScreenState) {
      navigation.navigate(STACK_SCENES.LOGIN_SCENE)
    }
    setToLoginScreenState(false)
    return () => {
      didCancel = true
    }
  }, [toLoginScreenState])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && image_uri) {
      setImageURIState(image_uri)
    }
    return () => {
      didCancel = true
    }
  }, [image_uri])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && imageSelectedState) {
      setImageURIState(image_uri)
    }
    setImageSelectedState(false)
    return () => {
      didCancel = true
    }
  }, [imageSelectedState])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && clearState) {
      dispatch(clearSelectedImage())
      setImageURIState(null)
    }
    setClearState(false)
    return () => {
      didCancel = true
    }
  }, [clearState])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && creteNFTState) {
      dispatch(createNewNFT(imageURIState))
    }
    setCreteNFTState(false)
    return () => {
      didCancel = true
    }
  }, [creteNFTState])

  const getValoraHandler = () => {
    setGetValoraLoginState(true)
  }

  const linkingAppleHandler = () => {
    Linking.openURL('https://apps.apple.com/app/id1520414263')
  }

  const linkingGooglePayHandler = () => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=co.clabs.valora'
    )
  }

  const LeftContent_valora = (props) => (
    <Avatar.Icon {...props} icon={VALORA_LIGHT.module} />
  )

  const LeftContent_creator = (props) => (
    <Avatar.Icon {...props} icon={LOGO_BW.module} />
  )

  const onSelectedImageHandler = (image_uri) => {
    setImageURIState(image_uri)
    setImageSelectedState(true)
  }

  const clearHandler = () => {
    setImageURIState(image_uri)
    setImageSelectedState(true)
  }

  const onCreateNFTHandler = () => {
    if (!imageURIState || imageURIState.lenght < 1) {
      alert('Please, select your Art Object first!');
    }

    navigation.navigate(STACK_SCENES.NFT_FIELDS_SCENE, {image_uri: imageURIState})
  
  }

  const selectedImageView = (!imageURIState || imageURIState.lenght < 0 ) ? (
    <Card.Content style={styles(theme).card_content}>
      <Title>{LOGIN_MODAL_TITLE.IMAGE_NOT_SELECTED}</Title>
    </Card.Content>
  ) : (
    <Card.Cover
      source={{ uri: imageURIState }}
      style={styles(theme).cover_container}
    />
  )
  const screenView =
    conectedWalletState.address === 'Not logged in' ? (
      <View style={styles.wrapper}>
        <Card style={styles(theme).card_container}>
          <Card.Title
            title={LOGIN_MODAL_TITLE.MAIN_TITLE}
            left={LeftContent_valora}
            titleNumberOfLines={2}
            style={{ width: width - 20 }}
          />
          <Card.Content style={styles(theme).card_content}>
            <FAB
              style={styles(theme).fab_link}
              label={BROWSE_TITLE.FAB_TITLE_APP_STORE}
              icon="apple"
              color={theme.colors.text}
              disabled={false}
              onPress={() => linkingAppleHandler()}
            />
            <FAB
              style={styles(theme).fab_link}
              label={BROWSE_TITLE.FAB_TITLE_GOOGLE_PLAY}
              icon="google-play"
              color={theme.colors.text}
              disabled={false}
              onPress={() => linkingGooglePayHandler()}
            />
          </Card.Content>
        </Card>
        <FAB
          style={styles(theme).fab}
          label={BROWSE_TITLE.FAB_TITLE_CONNECT_VALORA}
          icon={VALORA_LIGHT.module}
          disabled={false}
          onPress={() => getValoraHandler()}
        />
      </View>
    ) : (
      <View style={styles.wrapper}>
        <Card style={styles(theme).card_container}>
          <Card.Title
            title={LOGIN_MODAL_TITLE.CHOISE_IMAGE_TITLE}
            left={LeftContent_creator}
            titleNumberOfLines={4}
            style={{ width: width - 16 }}
          />
          {selectedImageView}
          <ImagePickerComponents
            onSelectedImage={(uri) => onSelectedImageHandler(uri)}
            onClear={() => clearHandler()}
            onCreateNFT={() => onCreateNFTHandler()}
          />
          <Card.Content></Card.Content>
        </Card>
      </View>
    )

  return screenView
}
