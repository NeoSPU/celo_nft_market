import * as React from 'react'

import { HeaderStyleInterpolators } from '@react-navigation/stack'

import {
  createDrawerNavigator
} from '@react-navigation/drawer'

import { useTheme } from 'react-native-paper'

import { BrowseStackNavigator } from '../BrowseNavigator/BrowseStackNavigator'
import { LoginStackNavigator } from '../AccountNavigator/LoginStackNavigator'
import { ValoraStackNavigator } from '../MyWalletNavigator/ValoraStackNavigator'
import { CreatorNFTStackNavigator } from '../CreatorNavigator/CreatorNFTStackNavigator'
import { ExchangeStackNavigator } from '../ExchangeNavigator/ExchangeStackNavigator'

import { AppDrawerContent } from './AppDrawerContent'
import { STACK_SCENES } from '../../services/types/sceneTypes'
import { TITLE } from '../../themes/titles'

export const DrawerNavigator = (props) => {
  const theme = useTheme()

  const Drawer = createDrawerNavigator()

  function bottomOptions() {
    return {
      title: TITLE.BROWSE,
      headerStyleInterpolator: HeaderStyleInterpolators.forFade
    }
  }

  return (
    <Drawer.Navigator
      initialRouteName={STACK_SCENES.BROWSE_SCENE}
      keyboardDismissMode="on-drag"
      drawerContent={(props) => <AppDrawerContent {...props} />}
      overlayColor={theme.colors.backdrop}
      drawerStyle={{
        backgroundColor: theme.colors.primary, 
      }}
    >
      <Drawer.Screen
        name={STACK_SCENES.BROWSE_SCENE}
        component={BrowseStackNavigator}
        options={bottomOptions}
      />
      <Drawer.Screen
        name={STACK_SCENES.LOGIN_SCENE}
        component={LoginStackNavigator}
        options={bottomOptions}
      />
      <Drawer.Screen
        name={STACK_SCENES.CONNECT_TO_VALORA_SCENE}
        component={ValoraStackNavigator}
        options={bottomOptions}
      />
      <Drawer.Screen
        name={STACK_SCENES.CREATE_SCENE}
        component={CreatorNFTStackNavigator}
        options={bottomOptions}
      />
      <Drawer.Screen
        name={STACK_SCENES.EXCHANGE_SCENE}
        component={ExchangeStackNavigator}
        options={bottomOptions}
      />
    </Drawer.Navigator>
  )
}
