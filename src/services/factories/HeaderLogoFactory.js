import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { useTheme, Avatar, Title } from 'react-native-paper'

import { STACK_SCENES } from '../../services/types/sceneTypes'

import {
  LOGO_BW,
  LOGO_COLOR,
  LOGO_CELO,
  LOGO_OPEN_SEA,
  LOGO_CELLO_COLOR,
  LOGO_CELLO_WHITE,
  LOGO_SEA_COLOR,
  LOGO_SEA_COLOR_TEXT_WHITE,
  NFT_MARKET_COLOR,
  NFT_MARKET_WHITE
} from '../../components/imageComponents/ImageToIcon'

import { TITLE } from '../../themes/titles'

const handlers = {
  [STACK_SCENES.BROWSE_SCENE]: () => {
    return TITLE.BROWSE
  },
  [STACK_SCENES.DRAWER_MENU]: (isDark) => {
    const whiteAvatar = (
      <Avatar.Image
        size={40}
        source={LOGO_COLOR.module}
        style={styles.headerIcon}
      />
    )

    const colorAvatar = (
      <Avatar.Image
        size={40}
        source={LOGO_BW.module}
        style={styles.headerIcon}
      />
    )

    return isDark ? colorAvatar : whiteAvatar
  },

  DEFAULT: (isDark) => (
    <Avatar.Icon
      size={40}
      source={LOGO_OPEN_SEA.module}
      style={styles.headerIcon}
    />
  )
}

export const HeaderLogoFactory = (sceneType) => {
  const theme = useTheme()
  const handler = handlers[sceneType] || handlers.DEFAULT
  return handler(theme.dark)
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
    // flexDirection: 'column'
  },
  headerIcon: {
    backgroundColor: 'transparent'
  }
})
