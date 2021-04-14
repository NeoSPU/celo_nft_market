import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { NFTList } from '../../components/carousel/NFTList'

import {
  retrievingAssets,
  retrievingOffsetAssets
} from '../../store/actions/networkAction'

import { STACK_SCENES } from '../../services/types/sceneTypes'
import { BROWSE_TITLE } from '../../themes/titles'

import { OSActivityIndicator } from '../../components/activity/OSActivityIndicator'

import { RecyclerViewsTypes } from '../../services/types/recyclerViewsTypes'

export const BrowseScreen = ({ navigation }) => {
  const [toCreateScreenState, setToCreateScreenState] = useState(false)

  const [assetsState, setAssetsState] = useState([])
  const [refreshAssetsState, setRefreshAssetsState] = useState(false)

  const [offsetLoadingState, setOffsetLoadingState] = useState(false)
  const [offsetState, setOffsetState] = useState(1)

  const [selectedAssetState, setSelectedAssetState] = useState({
      address: '',
      token_id: ''
  })

  const [navigateSelectedScreenState, setNavigateSelectedScreenState ] = useState(false)

  const dispatch = useDispatch()

  const assets = useSelector((state) => state.networkReducer.assets)

  const isLoading = useSelector((state) => state.networkReducer.loading)

  const offsetLoading = useSelector(
    (state) => state.networkReducer.offsetLoading
  )

  useEffect(() => {
    let didCancel = false
    if (!didCancel) {
      dispatch(retrievingAssets())
    }
    return () => {
      didCancel = true
    }
  }, [])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && assets) {
      setAssetsState(assets)
    }
    return () => {
      didCancel = true
    }
  }, [assets])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && refreshAssetsState) {
      dispatch(retrievingAssets())
      setRefreshAssetsState(false)
    }
    return () => {
      didCancel = true
    }
  }, [refreshAssetsState])

  useEffect(() => {
    let didCancel = false
    if (!didCancel) {
      setOffsetLoadingState(offsetLoading)
    }
    return () => {
      didCancel = true
    }
  }, [offsetLoading])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && navigateSelectedScreenState) {
      navigation.navigate(STACK_SCENES.ITEM_DETAIL_SCENE, {
        address: selectedAssetState.address,
        token_id: selectedAssetState.token_id
      })
    }
    setNavigateSelectedScreenState(false)
    return () => {
      didCancel = true
    }
  }, [navigateSelectedScreenState])

  useEffect(() => {
    let didCancel = false
    if (!didCancel && toCreateScreenState) {
      navigation.navigate(STACK_SCENES.CREATE_SCENE)
    }
    setToCreateScreenState(false)
    return () => {
      didCancel = true
    }
  }, [toCreateScreenState])

  const assetHolder = [
    {
      type: RecyclerViewsTypes.ASSETS,
      item: {
        id: 0,
        name: '',
        description: ''
      }
    }
  ]

  const onSelectedHolder = (asset_data) => {
    setSelectedAssetState(asset_data)
    setNavigateSelectedScreenState(true)
  }

  const onRefreshHandler = () => {
    setOffsetState(1)
    setRefreshAssetsState(true)
  }

  const onOffsetHandler = () => {
    if (!offsetLoadingState) {
      setOffsetState(offsetState + 1)
      dispatch(retrievingOffsetAssets(offsetState))
    }
  }

  const getValoraHandler = () => {
    setToCreateScreenState(true)
  }

  const data = assetsState.length ? assetsState : assetHolder

  if (!data.length) {
    return (
      <View>
        <Text>{BROWSE_TITLE.PLACEHOLDER_TITLE}</Text>
      </View>
    )
  }

  if (isLoading) {
    return <OSActivityIndicator />
  }

  return (
    <NFTList
      navigation={navigation}
      data={data}
      offsetLoading={offsetLoadingState}
      onSelectedNFTItem={(asset_data) => onSelectedHolder(asset_data)}
      onRefresh={() => {
        onRefreshHandler()
      }}
      onOffset={() => onOffsetHandler()}
      onValoraHandler={() => getValoraHandler()}
    />
  )
}
