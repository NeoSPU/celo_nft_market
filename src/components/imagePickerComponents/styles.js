import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const styles = (theme) => StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  list_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  card_container:{
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    height: width,
    marginHorizontal: 16
  },
  card_content: {
    flex: 0,
    width: width - 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 70
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab_link: {
    margin: 2,
    width: width/3.5,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.surface
  },
})

export default styles
