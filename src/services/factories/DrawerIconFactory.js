import React from 'react'
import { View, Icon } from 'react-native'
import {
  useTheme,
  Avatar,
  Title,
  Drawer,
  TouchableRipple,
  Switch
} from 'react-native-paper'

import { DRAWER_TITLE } from '../../themes/titles'
import { DRAWER_MENU_TYPES } from '../../services/types/sceneTypes'

import { Ionicons } from '@expo/vector-icons'

import { PreferencesContext } from '../../context/preferencesContext'
import {
  LOGO_BW,
  LOGO_COLOR,
  MOON_DARK,
  MOON_LIGHT,
  VALORA_LIGHT,
  CREATE_LIGHT,
  LOGO_CELO,
  EXCHANGE
} from '../../components/imageComponents/ImageToIcon'

import { styles_drawer } from './styles_drawer'

const handlers = {
  [DRAWER_MENU_TYPES.MAIN_ITEM]: (theme, isThemeDark) => {
    const titleTheme = {
      ...theme,
      colors: {
        text: theme.colors.main_title
      }
    }

    const logo = isThemeDark ? (
      <Avatar.Image
        size={50}
        source={LOGO_BW.module}
        style={styles_drawer.drawerLogoIcon}
      />
    ) : (
      <Avatar.Image
        size={50}
        source={LOGO_COLOR.module}
        style={styles_drawer.drawerLogoIcon}
      />
    )
    const logo_title = (
      <Title theme={titleTheme} style={styles_drawer.drawerLogotitle}>
        {DRAWER_TITLE.MAIN_TITLE}
      </Title>
    )

    return (
      <View style={styles_drawer.wrapper}>
        {logo}
        {logo_title}
      </View>
    )
  },
  [DRAWER_MENU_TYPES.BROSE_ITEM]: (
    theme,
    isThemeDark,
    toggleTheme,
    onBrowse,
    onLogin,
    onToValora,
    onCreate
  ) => {
    
    const customTheme = isThemeDark
    ? theme
    : {
        ...theme,
        colors: {
          text: theme.colors.drawerText
        }
      }

    return (
      <TouchableRipple onPress={() => onBrowse()}>
        <Drawer.Item
          icon={LOGO_BW.module}
          label={DRAWER_TITLE.HOME_BROWSE}
          theme={customTheme}
        />
      </TouchableRipple>
    )
  },
  [DRAWER_MENU_TYPES.MY_LOGIN_ITEM]: (
    theme,
    isThemeDark,
    toggleTheme,
    onBrowse,
    onLogin,
    onToValora,
    onCreate
  ) => {
    
    const customTheme = isThemeDark
    ? theme
    : {
        ...theme,
        colors: {
          text: theme.colors.drawerText
        }
      }

    return (
      <TouchableRipple onPress={() => onLogin()}>
        <Drawer.Item
          icon={LOGO_CELO.module}
          label={DRAWER_TITLE.MY_LOGIN}
          theme={customTheme}
        />
      </TouchableRipple>
    )
  },
  [DRAWER_MENU_TYPES.VALORA_ITEM]: (
    theme,
    isThemeDark,
    toggleTheme,
    onBrowse,
    onLogin,
    onToValora,
    onCreate
  ) => {
    
    const customTheme = isThemeDark
    ? theme
    : {
        ...theme,
        colors: {
          text: theme.colors.drawerText
        }
      }

    return (
      <TouchableRipple onPress={() => onToValora()}>
        <Drawer.Item
          icon={VALORA_LIGHT.module}
          label={DRAWER_TITLE.LOGIN_VALORA_WALLET}
          theme={customTheme}
        />
      </TouchableRipple>
    )
  },
  [DRAWER_MENU_TYPES.CREATE_ITEM]: (
    theme,
    isThemeDark,
    toggleTheme,
    onBrowse,
    onLogin,
    onToValora,
    onCreate
  ) => {
    
    const customTheme = isThemeDark
      ? theme
      : {
          ...theme,
          colors: {
            text: theme.colors.drawerText
          }
        }

    return (
      <TouchableRipple onPress={() => onCreate()}>
        <Drawer.Item
          icon={CREATE_LIGHT.module}
          label={DRAWER_TITLE.CREATE_NFTS}
          theme={customTheme}
        />
      </TouchableRipple>
    )
  },
  [DRAWER_MENU_TYPES.EXCHANGE_ITEM]: (
    theme,
    isThemeDark,
    toggleTheme,
    onBrowse,
    onLogin,
    onToValora,
    onCreate,
    onExchange
  ) => {
    
    const customTheme = isThemeDark
      ? theme
      : {
          ...theme,
          colors: {
            text: theme.colors.drawerText
          }
        }

    return (
      <TouchableRipple onPress={() => onExchange()}>
        <Drawer.Item
          icon={EXCHANGE.module}
          label={DRAWER_TITLE.EXCHANGE}
          theme={customTheme}
        />
      </TouchableRipple>
    )
  },
  [DRAWER_MENU_TYPES.SWITCH_ITEM]: (
    theme,
    isThemeDark,
    toggleTheme,
    onBrowse,
    onLogin,
    onToValora,
    onCreate
  ) => {
    const darkAvatar = <Avatar.Image size={20} source={MOON_DARK.module} />
    const lightAvatar = <Avatar.Image size={20} source={MOON_LIGHT.module} />
    const moon_icon = isThemeDark ? darkAvatar : lightAvatar
    const toggleHandler = () => {
      toggleTheme()
    }

    return (
      <View>
        <TouchableRipple onPress={() => toggleHandler()}>
          <View style={styles_drawer.preference}>
            {moon_icon}
            <View pointerEvents="none">
              <Switch value={isThemeDark} color={theme.colors.moon_logo} />
            </View>
          </View>
        </TouchableRipple>
      </View>
    )
  },
  DEFAULT: () => <View />
}

export const drawerIconFactory = (sceneType, onBrowse, onLogin, onToValora, onCreate, onExchange) => {
  const theme = useTheme()
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext)

  const handler = handlers[sceneType] || handlers.DEFAULT
  return handler(theme, isThemeDark, toggleTheme, onBrowse, onLogin, onToValora, onCreate, onExchange)
}
