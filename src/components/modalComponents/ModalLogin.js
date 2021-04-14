import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dimensions } from 'react-native'

import {
  useTheme,
  Modal,
  Portal,
  Button,
  Text,
  Paragraph,
  Card,
  Title,
  FAB,
  Avatar,
  Caption
} from 'react-native-paper'

import {
  LOGO_BW
} from '../../components/imageComponents/ImageToIcon'
import { PreferencesContext } from '../../context/preferencesContext'
import { styles } from './styles'
import { LOGIN_MODAL_TITLE } from '../../themes/titles'

import { loginCeloWallet } from '../../store/actions/celoNetworkAction'

const { width, height } = Dimensions.get('window')

export const ModalLogin = ({ visible }) => {
  const theme = useTheme()
  const [visibleState, setVisibleState] = useState(false)

  useEffect(() => {
    let didCancel = false
    if (!didCancel) {
      setVisibleState(visible)
    }
    return () => {
      didCancel = true
    }
  }, [])

  const LeftContent = (props) => <Avatar.Icon {...props} icon={LOGO_BW.module} />

  return (
    <Portal>
      <Modal
        visible={visibleState}
        onDismiss={() => setVisibleState(false)}
        contentContainerStyle={styles(theme).containerStyle}
      >
        <Card style={styles(theme).card_container}>
          <Card.Title title={LOGIN_MODAL_TITLE.MODAL_SOON} left={LeftContent} />
          <Card.Actions>
            <Button onPress={() => setVisibleState(false)}>Ok</Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  )
}
