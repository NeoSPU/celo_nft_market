import React from 'react'

import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Drawer } from 'react-native-paper'

import { drawerIconFactory } from '../../services/factories/DrawerIconFactory'

import { DRAWER_MENU_TYPES, STACK_SCENES } from '../../services/types/sceneTypes'
import { styles } from './styles'


export function AppDrawerContent(props) {

  const onBrowseHandler = () => {
    props.navigation.navigate(STACK_SCENES.BROWSE_SCENE)
  }

  const onLoginHandler = () => {
    props.navigation.navigate(STACK_SCENES.LOGIN_SCENE)
  }

  const onToValoraHandler = () => {
    props.navigation.navigate(STACK_SCENES.CONNECT_TO_VALORA_SCENE)
  }

  const onCreateHandler = () => {
    props.navigation.navigate(STACK_SCENES.CREATE_SCENE)
  }

  const onExchangeHandler = () => {
    props.navigation.navigate(STACK_SCENES.EXCHANGE_SCENE)
  }

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section>
        {drawerIconFactory(DRAWER_MENU_TYPES.MAIN_ITEM)}
      </Drawer.Section>
      <Drawer.Section style={styles.menu_section}>
        {drawerIconFactory(
          DRAWER_MENU_TYPES.BROSE_ITEM,
          onBrowseHandler,
          onLoginHandler,
          onToValoraHandler,
          onCreateHandler
        )}
        {drawerIconFactory(
          DRAWER_MENU_TYPES.MY_LOGIN_ITEM,
          onBrowseHandler,
          onLoginHandler,
          onToValoraHandler,
          onCreateHandler
        )}
        {drawerIconFactory(
          DRAWER_MENU_TYPES.VALORA_ITEM,
          onBrowseHandler,
          onLoginHandler,
          onToValoraHandler,
          onCreateHandler
        )}
        {drawerIconFactory(
          DRAWER_MENU_TYPES.CREATE_ITEM,
          onBrowseHandler,
          onLoginHandler,
          onToValoraHandler,
          onCreateHandler
        )}
        {drawerIconFactory(
          DRAWER_MENU_TYPES.EXCHANGE_ITEM,
          onBrowseHandler,
          onLoginHandler,
          onToValoraHandler,
          onCreateHandler,
          onExchangeHandler
        )}
      </Drawer.Section>
      <Drawer.Section style={styles.themes_section}>
        {drawerIconFactory(DRAWER_MENU_TYPES.SWITCH_ITEM)}
      </Drawer.Section>
    </DrawerContentScrollView>
  )
}
