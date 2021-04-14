import React, { useState } from 'react'
import { View } from 'react-native'
import { FAB, useTheme } from 'react-native-paper'

import { ItemListOSComponent } from '../itemComponents/ItemListOSComponent'

import { styles } from './styles'
import '../../../global'
import { BROWSE_TITLE } from '../../themes/titles'

export const NFTList = ({ navigation, data, offsetLoading, onSelectedNFTItem, onRefresh, onOffset, onValoraHandler }) => {
  const theme = useTheme()

  return (
    <View style={styles.wrapper}>
      <View style={styles.list_container}>
        <ItemListOSComponent
          navigation={{ navigation }}
          data={data}
          offsetLoading={offsetLoading}
          onSelectedNFTItem={(asset_data) => onSelectedNFTItem(asset_data)}
          onRefresh={() => onRefresh()}
          onOffset={() => onOffset()}
        />
      </View>
      <FAB
        style={styles.fab}
        label={BROWSE_TITLE.FAB_TITLE}
        icon="plus"
        onPress={() => onValoraHandler()}
      />
    </View>
  )
}
