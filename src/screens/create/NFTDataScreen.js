import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Linking from 'expo-linking'

import { View, Dimensions } from 'react-native'
import { Card, FAB, Avatar, TextInput, useTheme } from 'react-native-paper'

import { BROWSE_TITLE } from '../../themes/titles'
import { LOGO_BW, VALORA_LIGHT } from '../../components/imageComponents/ImageToIcon'
import { LOGIN_MODAL_TITLE } from '../../themes/titles'
import { STACK_SCENES } from '../../services/types/sceneTypes'
import { ImagePickerComponents } from '../../components/imagePickerComponents/ImagePickerComponents'
import { clearSelectedImage } from '../../store/actions/systemAction'
import { createNewNFT } from '../../store/actions/celoNetworkAction'

import { styles } from './styles'

const { width, height } = Dimensions.get('window')

export const NFTDataScreen = ({ navigation }) => {
  const theme = useTheme()

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const LeftContent_creator = (props) => (
    <Avatar.Icon {...props} icon={LOGO_BW.module} />
  )

  const createHandler = () => {
      if (!name, name.length < 1) {
        alert('Please, enter Name for your Art Object!');
      } else {
        alert('Congratulation! Your Art Object has been created!!');

          navigation.navigate(STACK_SCENES.BROWSE_SCENE)
      }

  }

  return (
    <View style={styles(theme).wrapper}>
      <Card style={styles(theme).card_container}>
        <Card.Title
          title={LOGIN_MODAL_TITLE.ENTER_NFT_DATA_TITLE}
          left={LeftContent_creator}
          titleNumberOfLines={2}
          style={{ width: width - 20 }}
        />
        <Card.Content style={styles(theme).card_content}>
          <TextInput
            label="NFT Asset Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles(theme).text_input}
          />
          <TextInput
            label="Description"
            value={description}
            multiline={true}
            onChangeText={(text) => setDescription(text)}
            style={styles(theme).text_input}
          />
        </Card.Content>
      </Card>
      <FAB
        style={styles(theme).fab}
        label={BROWSE_TITLE.FAB_TITLE_CONNECT_VALORA}
        icon={VALORA_LIGHT.module}
        disabled={false}
        onPress={() => createHandler()}
      />
    </View>
  )

  return screenView
}
