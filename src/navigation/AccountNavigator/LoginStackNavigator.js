import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { MyAccountScreen } from '../../screens/account/MyAccountScreen'

import { AppBarHeader } from '../AppBarHeader'
import { STACK_SCENES } from '../../services/types/sceneTypes'

const LoginStack = createStackNavigator()

export const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator
      initialRouteName={STACK_SCENES.LOGIN_SCENE}
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
      <LoginStack.Screen
        name={STACK_SCENES.LOGIN_SCENE}
        component={MyAccountScreen}
        options={{ headerTitle: STACK_SCENES.LOGIN_SCENE }}
      />
    </LoginStack.Navigator>
  )
}