import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { CreatorNFTScreen } from '../../screens/create/CreatorNFTScreen'
import { NFTDataScreen } from '../../screens/create/NFTDataScreen'

import { AppBarHeader } from '../AppBarHeader'
import { STACK_SCENES } from '../../services/types/sceneTypes'

const CreatorNFTStack = createStackNavigator()

export const CreatorNFTStackNavigator = () => {
  return (
    <CreatorNFTStack.Navigator
      initialRouteName={STACK_SCENES.CREATE_SCENE}
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
      <CreatorNFTStack.Screen
        name={STACK_SCENES.CREATE_SCENE}
        component={CreatorNFTScreen}
        options={{ headerTitle: STACK_SCENES.CREATE_SCENE }}
      />
      <CreatorNFTStack.Screen
        name={STACK_SCENES.NFT_FIELDS_SCENE}
        component={NFTDataScreen}
        options={{ headerTitle: STACK_SCENES.NFT_FIELDS_SCENE }}
      />
    </CreatorNFTStack.Navigator>
  )
}
