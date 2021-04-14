import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ExchangeScreen } from '../../screens/exchange/ExchangeScreen'

import { AppBarHeader } from '../AppBarHeader'
import { STACK_SCENES } from '../../services/types/sceneTypes'

const ExchangeStack = createStackNavigator()

export const ExchangeStackNavigator = () => {
  return (
    <ExchangeStack.Navigator
      initialRouteName={STACK_SCENES.EXCHANGE_SCENE}
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
      <ExchangeStack.Screen
        name={STACK_SCENES.EXCHANGE_SCENE}
        component={ExchangeScreen}
        options={{ headerTitle: STACK_SCENES.EXCHANGE_SCENE }}
      />
    </ExchangeStack.Navigator>
  )
}