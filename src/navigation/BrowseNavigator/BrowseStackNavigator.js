import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { BrowseScreen } from '../../screens/browse/BrowseScreen'
import { ItemScreen } from '../../screens/items/ItemScreen'

import { AppBarHeader } from '../AppBarHeader'
import { STACK_SCENES } from '../../services/types/sceneTypes'

const BrowseStack = createStackNavigator()

export const BrowseStackNavigator = () => {
  return (
    <BrowseStack.Navigator
      initialRouteName="BrowseScreen"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <AppBarHeader
            scene={scene}
            previous={previous}
            navigation={navigation}
          />
        )
      }}
    >
      <BrowseStack.Screen
        name={STACK_SCENES.BROWSE_SCENE}
        component={BrowseScreen}
        options={{ headerTitle: STACK_SCENES.BROWSE_SCENE }}
      />
      <BrowseStack.Screen
        name={STACK_SCENES.ITEM_DETAIL_SCENE}
        component={ItemScreen}
        options={{ headerTitle:  STACK_SCENES.ITEM_DETAIL_SCENE }}
      />
    </BrowseStack.Navigator>
  )
}
