import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const styles = (theme) => StyleSheet.create({
  containerStyle: { 
    flex: 0, 
    padding: 20, 
    backgroundColor: theme.colors.primary 
  },
  card_container: {
    flex: 0, 
    justifyContent: 'center', 
    alignContent: 'center', 
    alignItems: 'center', 
    height: width
  },
  title_container: {
    flex: 1, 
    alignSelf: 'center'
  },
  logo_container: {
    flex: 0, 
    alignSelf: 'center'
  },
  action_container: {
    flex: 1, 
    marginTop: 40, 
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: 10, 
    borderRadius: 4
  }
})

export default styles
