import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking';

import { View, Dimensions } from 'react-native'
import {
  Paragraph,
  Card,
  FAB,
  Avatar,
  Title,
  useTheme
} from 'react-native-paper'

import { loginCeloWallet } from '../../store/actions/celoNetworkAction'

import { OSActivityIndicator } from '../../components/activity/OSActivityIndicator'
import { BROWSE_TITLE } from '../../themes/titles'
import {
  VALORA_LIGHT,
  CELO_WHITE
} from '../../components/imageComponents/ImageToIcon'
import { LOGIN_MODAL_TITLE } from '../../themes/titles'
import { STACK_SCENES } from '../../services/types/sceneTypes'

import { styles } from './styles'

const { width, height } = Dimensions.get('window')

export const ValoraWalletScreen = ({ navigation }) => {
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

  const connectedWallet = useSelector(
    (state) => state.celoNetworkReducer.connectedWallet
  )

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

  const LeftContent = (props) => (
    <Avatar.Icon {...props} icon={VALORA_LIGHT.module} />
  )

  const getValoraHandler = () => {
    setGetValoraLoginState(true)
  }

  const linkingAppleHandler = () => {
    Linking.openURL('https://apps.apple.com/app/id1520414263');
  }

  const linkingGooglePayHandler = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=co.clabs.valora');
  }

  const screenView =
    conectedWalletState.address === 'Not logged in' ? (
      <View style={styles.wrapper}>
        <Card
          style={styles(theme).card_container}
        >
          <Card.Title
            title={LOGIN_MODAL_TITLE.MAIN_TITLE}
            left={LeftContent}
            titleNumberOfLines={2}
            style={{ width: width - 20 }}
          />
          <Card.Content
            style={styles(theme).card_content}
          >
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
            title={LOGIN_MODAL_TITLE.LOGGED_TITLE}
            left={LeftContent}
            titleNumberOfLines={4}
            style={{ width: width - 16 }}
          />
        </Card>
        <FAB
          style={styles(theme).fab}
          label={BROWSE_TITLE.FAB_TITLE_CONNECT_VALORA}
          icon={VALORA_LIGHT.module}
          disabled={true}
        />
      </View>
    )

  return screenView
}
