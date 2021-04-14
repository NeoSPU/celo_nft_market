import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import {
  useTheme,
  Paragraph,
  Caption,
  TouchableRipple
} from 'react-native-paper'
import { PLACEHOLDER } from '../imageComponents/ImageToIcon'
import { BROWSE_TITLE } from '../../themes/titles'

const { width, height } = Dimensions.get('window')

export const ItemComponent = ({ nftAsset, onSelect }) => {
  const theme = useTheme()

  const imageUrl = nftAsset.image_thumbnail_url
    ? nftAsset.image_thumbnail_url
    : nftAsset.image_url

  const imageNFT = imageUrl ? (
    <Image style={styles.imageComponents} source={{ uri: imageUrl }} />
  ) : (
    <Image style={styles.imageComponents} source={PLACEHOLDER.module} />
  )

  const titleCut = (title) => {
    return title ? title.substring(0, 9) : title
  }

  const onSelectHandler = () => {
    onSelect({address: nftAsset.asset_contract_address, token_id: nftAsset.token_id})
  }

  const itemContainer = (
      <TouchableOpacity style={styles.wrapper} onPress={onSelectHandler}>
        <View style={styles.image_container} >
          {imageNFT}
        </View>
        <View style={styles.title_wrapper}>
          <View style={styles.titleContainer}>
            <Caption>{titleCut(nftAsset.collection_name)}</Caption>
            <Paragraph>{titleCut(nftAsset.asset_name)}</Paragraph>
          </View>
          <View style={styles.titleContainer_right}>
            <Caption>{BROWSE_TITLE.PRICE}</Caption>
            <Paragraph>{nftAsset.sell_order_price/Math.pow(10, 18)}</Paragraph>
          </View>
        </View>
      </TouchableOpacity>
  )
  return itemContainer
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 2,
    borderRadius: width * 0.02,
    height: height / 2.8 - 8,
    width: width / 2 - 16,
  },
  image_container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    width: width / 2 - 16,
    aspectRatio: 1,
  },
  imageComponents: {
    flex: 0,
    width: width / 2 - 16,
    aspectRatio: 1,
    borderRadius: width * 0.02,
  },
  title_wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 4,
    width: width / 2 - 16,
  },
  titleContainer_right: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginRight: 4,
    width: width / 2 - 16,
  },
})
