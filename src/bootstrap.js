import * as Font from 'expo-font'

export async function bootstrap() {
  try {
    await Font.loadAsync({
      'ebgaramond-bold': require('../assets/Fonts/EBGaramond-Bold.ttf'),
      'ebgaramond-regular': require('../assets/Fonts/EBGaramond-Regular.ttf'),
      'ebgaramond-medium': require('../assets/Fonts/EBGaramond-Medium.ttf')
    })
  } catch (e) {
    console.log('Bootstrap Catch Error: ', e)
  }
}
