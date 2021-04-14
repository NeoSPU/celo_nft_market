import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const styles = (theme) => {

    return StyleSheet.create({
    wrapper: {
      flex: 1,
      height: height,
      width: width,
      marginHorizontal: 8
    },
    items_container: {
      flex: 1,
      height: height / 2.8,
      width: width / 2 - 8,
      marginTop: 4,
      marginHorizontal: 4,
      borderRadius: width * 0.02,
      borderWidth: 0.5,
      borderColor: theme.colors.avatarBorder ,
      backgroundColor: theme.colors.avatarBackground
    },
    items_container_header: {
      flex: 1,
      height: 50 + height / 2.8,
      width: width / 2 - 8,
      marginTop: 50,
      marginHorizontal: 4,
      borderRadius: width * 0.02,
      borderWidth: 0.5,
      borderColor: theme.colors.avatarBorder,
      backgroundColor: theme.colors.avatarBackground
    }
  })
}