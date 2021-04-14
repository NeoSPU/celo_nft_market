import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { View, Dimensions} from 'react-native'
import {
  Paragraph,
  Card,
  FAB,
  Avatar,
} from 'react-native-paper'

import { loginCeloWallet } from '../../store/actions/celoNetworkAction'

import { OSActivityIndicator } from '../../components/activity/OSActivityIndicator'
import { BROWSE_TITLE } from '../../themes/titles'
import { VALORA_LIGHT, CELO_WHITE } from '../../components/imageComponents/ImageToIcon'
import { styles } from './styles'

const { width, height } = Dimensions.get('window')

export const MyAccountScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [getValoraLoginState, setGetValoraLoginState] = useState(false)
  const [conectedWalletState, setConectedWalletState] = useState({
    address: 'Not logged in',
    phoneNumber: 'Not logged in',
    cUSDBalance: 'Not logged in',
    isLoadingBalance: false
  })

  const connectedWallet = useSelector((state) => state.celoNetworkReducer.connectedWallet)
  const isLoading = useSelector((state) => state.networkReducer.loading)

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

  const LeftContent = props => <Avatar.Icon {...props} icon={CELO_WHITE.module} />

  const getValoraHandler = () => {
    setGetValoraLoginState(true)
  }

  if (isLoading) {
    return <OSActivityIndicator />
  }

  return (
    <View style={styles.wrapper}>
        <Card style={{flex: 0, justifyContent: 'center', alignItems: 'center', marginTop: 70, height: width, marginHorizontal: 16}}>
        <Card.Title title="MY CELO LOGIN:" subtitle="with VALORA wallet" left={LeftContent}/>
          <Card.Content>
            <Paragraph>Address: {conectedWalletState.address}</Paragraph>
            <Paragraph>Phone Number: {conectedWalletState.phoneNumber}</Paragraph>
            <Paragraph>cUSD Balance: {conectedWalletState.cUSDBalance}</Paragraph>
          </Card.Content>
        </Card>
      <FAB
        style={styles.fab}
        label={BROWSE_TITLE.FAB_TITLE_CONNECT_VALORA}
        icon={VALORA_LIGHT.module}
        disabled={conectedWalletState.address != 'Not logged in'}
        onPress={() => getValoraHandler()}
      />
    </View>
  )

}
