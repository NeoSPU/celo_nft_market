import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'

import { View, Dimensions } from 'react-native'
import {
  Paragraph,
  Card,
  DataTable,
  Avatar,
  useTheme
} from 'react-native-paper'

import { loginCeloWallet } from '../../store/actions/celoNetworkAction'

import { OSActivityIndicator } from '../../components/activity/OSActivityIndicator'
import { BROWSE_TITLE } from '../../themes/titles'
import {
  VALORA_LIGHT,
  EXCHANGE
} from '../../components/imageComponents/ImageToIcon'
import { LOGIN_MODAL_TITLE } from '../../themes/titles'
import { STACK_SCENES } from '../../services/types/sceneTypes'

import { styles } from './styles'

const { width, height } = Dimensions.get('window')

export const ExchangeScreen = ({ navigation }) => {
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
    <Avatar.Icon {...props} icon={EXCHANGE.module} />
  )

  const linkIcon = <Avatar.Icon size={24} icon="link" />

  const bittrexHandler = () => {
    Linking.openURL('https://bittrex.com/Market/Index?MarketName=USD-CELO')
  }

  const coinListHandler = () => {
    Linking.openURL('https://coinlist.co/asset/celo')
  }

  const okCoinHandler = () => {
    Linking.openURL('https://www.okcoin.com/en/spot/trade/cusd-usd')
  }

  return (
    <View style={styles.wrapper}>
      <Card style={styles(theme).card_container}>
        <Card.Title
          title={LOGIN_MODAL_TITLE.EXCHANGE_TITLE}
          left={LeftContent}
          titleNumberOfLines={4}
          style={{ width: width - 16 }}
        />
        <Card.Content>
          <Paragraph>{LOGIN_MODAL_TITLE.EXCHANGE_DESCRIPTION}</Paragraph>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>Bittrex</DataTable.Cell>
              <DataTable.Cell numeric onPress={() => bittrexHandler()}>{linkIcon}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>CoinList Pro</DataTable.Cell>
              <DataTable.Cell numeric onPress={() => coinListHandler()}>{linkIcon}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>OKCoin</DataTable.Cell>
              <DataTable.Cell numeric onPress={() => okCoinHandler()}>{linkIcon}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>
    </View>
  )
}
