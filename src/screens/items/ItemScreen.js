import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { retrievingSingleAsset } from '../../store/actions/networkAction'

import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import {
  useTheme,
  Paragraph,
  Card,
  Title,
  FAB,
  Avatar,
  Caption
} from 'react-native-paper'

import { OSActivityIndicator } from '../../components/activity/OSActivityIndicator'
import { ModalLogin } from '../../components/modalComponents/ModalLogin'
import { BROWSE_TITLE } from '../../themes/titles'
import { styles } from './styles'

const { width, height } = Dimensions.get('window')

export const ItemScreen = ({ route }) => {
  const [assetState, setAssetState] = useState([])
  const [loginVisibleState, setLoginVisibleState] = useState(false)

  const theme = useTheme()
  const dispatch = useDispatch()

  const single_asset = useSelector((state) => state.networkReducer.single_asset)
  const isLoading = useSelector((state) => state.networkReducer.loading)

  const asset_data = {
    address: route.params.address,
    token_id: route.params.token_id
  }

  useEffect(() => {
    let didCancel = false
    if (!didCancel) {
      dispatch(retrievingSingleAsset(asset_data))
    }
    return () => {
      didCancel = true
    }
  }, [])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && single_asset) {
      setAssetState(single_asset)
    }
    return () => {
      didCancel = true
    }
  }, [single_asset])

  const LeftContent = (props) => (
    <Avatar.Image
      size={34}
      source={{ uri: assetState.owner_profile_img_url }}
    />
  )

  if (isLoading) {
    return <OSActivityIndicator />
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card>
          <Card.Title
            title={assetState.asset_name}
            subtitle={`Collection: ${assetState.collection_name}`}
            left={LeftContent}
            titleNumberOfLines={3}
            subtitleNumberOfLines={3}
          />
          <Card.Content>
            <Paragraph>Creator by: {assetState.creator}</Paragraph>
            <Paragraph>Owner by: {assetState.owner}</Paragraph>
            <Caption>
              Contract sheme: {assetState.asset_contract_schema_name}
            </Caption>
            <Caption>
              Price: {assetState.current_price / Math.pow(10, 18)}
            </Caption>
          </Card.Content>
          <View style={{ flex: 1, justifyContent: 'center', height: width, aspectRatio: 1, marginTop: 8, backgroundColor: theme.colors.primary}}>
            <Card.Cover
              source={{ uri: assetState.image_preview_url }}
              style={{ flex: 1}}
            />
          </View>
          <Card.Content>
            <Title>Description NFT asset:</Title>
            <Paragraph>{assetState.asset_description}</Paragraph>
            <Title>Description of collection:</Title>
            <Paragraph>{assetState.collection_description}</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
      <FAB
        style={styles.fab}
        label={BROWSE_TITLE.FAB_TITLE_BUY}
        disabled={!assetState.current_price > 0}
        onPress={() => setLoginVisibleState(true)}
      />
      <ModalLogin
        visible={loginVisibleState}
      />
    </View>
  )
}
