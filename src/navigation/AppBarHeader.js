import React from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'
import { HeaderLogoFactory } from '../services/factories/HeaderLogoFactory'
import { STACK_SCENES } from '../services/types/sceneTypes'

const deviceSize = Dimensions.get('window')

export const AppBarHeader = ({ scene, previous, navigation }) => {
  const logoDrawer = HeaderLogoFactory(STACK_SCENES.DRAWER_MENU)
  const title = HeaderLogoFactory(STACK_SCENES.BROWSE_SCENE)
  return (
    <Appbar.Header style={styles.wrapp}>
      <View style={styles.wrapp}>
        {previous ? (
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack()
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer()
            }}
            style={styles.menuIcon}
          >
            {logoDrawer}
            <Avatar.Icon
              size={30}
              icon="chevron-down"
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titleContainer}>
        <Appbar.Content title={title} subtitle={scene.route.name} titleStyle={styles.title} subtitleStyle={styles.subtitle}/>
      </View>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  wrapp: {
    flex: 0,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  headerIcon: {
    backgroundColor: 'transparent',
    marginLeft: -10
  },
  menuIcon: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 0
  },
  title: {
    flex: 1,
    fontSize: 21,
    fontWeight: 'bold'
  },
  subtitle: {
    flex: 1,
    fontFamily: 'ebgaramond-regular',
    fontSize: 19,
  }
})
