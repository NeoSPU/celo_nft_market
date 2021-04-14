import React from 'react'

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native'

import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper'

import { Appearance } from 'react-native-appearance'

import { DrawerNavigator } from '../navigation/DrawerNavigator/DrawerNavigator'
import { PreferencesContext } from '../context/preferencesContext'

import { DarkColorScheme, DefaultColorScheme } from '../themes/customizedThemes'

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  ...DefaultColorScheme
}

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  ...DarkColorScheme
}

export const AppNavigation = () => {
  const appearanceTheme = Appearance.getColorScheme()

  const [isThemeDark, setIsThemeDark] = React.useState(
    appearanceTheme === 'dark'
  )

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark)
  }, [isThemeDark])

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark
    }),
    [toggleTheme, isThemeDark]
  )

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  )
}
