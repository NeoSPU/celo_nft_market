import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Dimensions, RefreshControl } from 'react-native'
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from 'recyclerlistview'
import { useTheme, ActivityIndicator } from 'react-native-paper'

import StickyContainer from 'recyclerlistview/sticky'

import { ItemComponent } from './ItemComponent'
import { OSSearchBar } from '../searchBarComponents/OSSearchBar'
import { RecyclerViewsTypes } from '../../services/types/recyclerViewsTypes'
import { styles } from './styles'

import { setStartIndex } from '../../store/actions/systemAction'

const { width, height } = Dimensions.get('window')

export const ItemListOSComponent = ({ navigation, data, offsetLoading, onSelectedNFTItem, onRefresh, onOffset }) => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [selectedIdexState, setSelectedIndexState] = useState(0)

  const startIndex = useSelector(
    (state) => state.systemReducer.startIndex
  )

  useEffect(() => {
    let didCancel = false
    if (!didCancel && startIndex) {
      setSelectedIndexState(startIndex)
    }
    return () => {
      didCancel = true
    }
  }, [startIndex])

  const onSelectAssetHandler = (assetData, index) => {
    dispatch(setStartIndex(index))
    onSelectedNFTItem(assetData)
  }

  //==================================================================
  // Refreshing Action
  //==================================================================

  const [refreshing, setRefreshing] = useState(false)

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout)
    }, [])
  }

  const refreshHandler = useCallback(() => {
    onRefresh()
    wait(2000).then(() => setRefreshing(false))
  }, [refreshing])

  //==================================================================
  // RecyclerListView
  //==================================================================

  const dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2
  }).cloneWithRows(data)

  const layoutProvider = new LayoutProvider(
    (index) => {
        return RecyclerViewsTypes.ASSETS
    },
    (type, dim) => {
      switch (type) {
        case RecyclerViewsTypes.ASSETS:
          dim.height = height / 2.8
          dim.width = width / 2
          break
        default:
          dim.height = 0
          dim.width = 0
      }
    }
  )

  const itemView = (data, index, style) => {
    return (
      <View style={style}>
        <ItemComponent nftAsset={data} onSelect={(asset_data) => onSelectAssetHandler(asset_data, index)}/>
      </View>
    )
  }

  const footerView = () => {
    return (
      <View style={{flex: 1, height: 70, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator animating={offsetLoading} color={theme.colors.accent} size='small'/>
      </View>
    )
  }

  const footerRender = () => {
    return footerView()
  }
    
  const rowRenderer = (type, data, index) => {
      
        return itemView(data, index, styles(theme).items_container)
  }

  //==================================================================
  // Flip Search Section
  //==================================================================

  const _overrideRowRenderer = (type, data, index) => {
    const view = rowRenderer(type, data, index)
    switch (index) {
      case 0:
        return <OSSearchBar />
      case 5:
        return <View />
    }
    return view
  }

  //==================================================================
  // RENDERING
  //==================================================================

  return (
      <View style={styles(theme).wrapper}>
        {/* <StickyContainer
              stickyHeaderIndices={[0, 5]}
              overrideRowRenderer={_overrideRowRenderer}
            > */}
              <RecyclerListView
                layoutProvider={layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={rowRenderer}
                showsVerticalScrollIndicator={false}
                initialRenderIndex={selectedIdexState}
                onEndReached={onOffset}
                onEndReachedThreshold={0.5}
                renderFooter={() => footerRender()}
                // refreshControl={
                  // <RefreshControl
                  //   refreshing={refreshing}
                  //   onRefresh={refreshHandler}
                    // colors={theme.colors.accent}
                    // tintColor={theme.colors.accent}
                  // />
                // }
              />
        {/* </StickyContainer> */}
      </View>
  )
}
