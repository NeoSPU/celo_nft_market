import React from 'react'
import { View} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import { Avatar, Title } from 'react-native-paper'

import { BROWSE_TITLE } from '../../themes/titles'
import { styles } from './styles'

export const TrendingCollectionTitle = ({colors}) => {
  return (
    <View style={styles.titleContainer}>
      <Avatar.Icon
        size={24}
        color={colors.drawerText}
        style={{backgroundColor: colors.avatarBackground}}
        icon={(props) => <MaterialIcons name="insights" size={24} {...props} />}
      />
      <Title style={styles.titleText}>{BROWSE_TITLE.TRENDING_COLLECTIONS}</Title>
    </View>
  )
}

export const DigitalArtTitle = ({colors}) => {
    return (
      <View style={styles.titleContainer}>
        <Avatar.Icon
          size={24}
          color={colors.drawerText}
          style={{backgroundColor: colors.avatarBackground}}
          icon={(props) => <MaterialIcons name="palette" size={24} {...props} />}
        />
        <Title style={styles.titleText}>{BROWSE_TITLE.DIGITAL_ART}</Title>
      </View>
    )
  }

  export const VirtualWorldsTitle = ({colors}) => {
    return (
      <View style={styles.titleContainer}>
        <Avatar.Icon
          size={24}
          color={colors.drawerText}
          style={{backgroundColor: colors.avatarBackground}}
          icon={(props) => <MaterialIcons name="landscape" size={24} {...props} />}
        />
        <Title style={styles.titleText}>{BROWSE_TITLE.VIRTUAL_WORLDS}</Title>
      </View>
    )
  }

  export const CollectiblesTitle = ({colors}) => {
    return (
      <View style={styles.titleContainer}>
        <Avatar.Icon
          size={24}
          color={colors.drawerText}
          style={{backgroundColor: colors.avatarBackground}}
          icon={(props) => <MaterialIcons name="emoji-events" size={24} {...props} />}
        />
        <Title style={styles.titleText}>{BROWSE_TITLE.COLLECTIBLES}</Title>
      </View>
    )
  }
