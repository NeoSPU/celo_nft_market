import { StyleSheet } from 'react-native'
import { web3 } from '../../../root'
// import Constants from 'expo-constants'

export const styles_drawer = StyleSheet.create({
  wrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  preference: {
    flex: 0,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  drawerLogoIcon: {
    flex: 0,
    alignSelf: 'center',
    paddingHorizontal: 8
  },
  drawerLogotitle: {
    flex: 0,
    alignSelf: 'center',
    marginLeft: 4,
    fontWeight: 'bold',
    paddingHorizontal: 8
  },
})

export default styles_drawer