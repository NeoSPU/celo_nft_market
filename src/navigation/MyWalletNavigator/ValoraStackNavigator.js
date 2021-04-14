import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ValoraWalletScreen } from '../../screens/celoStation/ValoraWalletScreen'

import { AppBarHeader } from '../AppBarHeader'
import { STACK_SCENES } from '../../services/types/sceneTypes'

const ValoraStack = createStackNavigator()

export const ValoraStackNavigator = () => {
  return (
    <ValoraStack.Navigator
      initialRouteName={STACK_SCENES.CONNECT_TO_VALORA_SCENE}
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
      <ValoraStack.Screen
        name={STACK_SCENES.CONNECT_TO_VALORA_SCENE}
        component={ValoraWalletScreen}
        options={{ headerTitle: STACK_SCENES.CONNECT_TO_VALORA_SCENE }}
      />
    </ValoraStack.Navigator>
  )
}