import React, {useState} from 'react'
import { View, ScrollView, Text } from 'react-native'
import { FAB, Portal, useTheme } from 'react-native-paper'

import { OSSearchBar } from '../searchBarComponents/OSSearchBar'
import { ItemListOSComponent } from '../itemComponents/ItemListOSComponent'
import {
  TrendingCollectionTitle,
  DigitalArtTitle,
  VirtualWorldsTitle,
  CollectiblesTitle
} from './BrowseTitle'

import { styles } from './styles'
import { STACK_SCENES } from '../../services/types/sceneTypes'
import '../../../global'
import { ModalLogin } from '../modalComponents/ModalLogin'

export const Carousel = ({ navigation, data, onLoginModal }) => {
  const theme = useTheme()
  const [loginVisibleState, setLoginVisibleState] = useState(false);

  const showModal = () => setLoginVisibleState(true);
  const hideModal = () => setVisible(false);

  const addNFTHandler = () => {}

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        <OSSearchBar />
        <TrendingCollectionTitle colors={theme.colors} />
        <View style={styles.wrapper}>
          <ItemListOSComponent data={data} navigation={{ navigation }} />
        </View>
        <DigitalArtTitle colors={theme.colors} />
        <View style={styles.wrapper}>
          <ItemListOSComponent data={data} navigation={{ navigation }} />
        </View>
        <VirtualWorldsTitle colors={theme.colors} />
        <View style={styles.wrapper}>
          <ItemListOSComponent data={data} navigation={{ navigation }} />
        </View>
        <CollectiblesTitle colors={theme.colors} />
        <View style={styles.wrapper}>
          <ItemListOSComponent data={data} navigation={{ navigation }} />
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        label={'ADD NFT'}
        icon="plus"
        onPress={() => setLoginVisibleState(true)}
      />
        <ModalLogin visible={loginVisibleState} hideModal={() => setLoginVisibleState(false)}/>
    </View>
  )
}
