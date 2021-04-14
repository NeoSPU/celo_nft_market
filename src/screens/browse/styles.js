import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  }
});

export default styles;