import { DefaultTheme, DarkTheme, configureFonts } from 'react-native-paper'
import { FontsConfig } from '../config/fontsConfig'

export const DefaultColorScheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    accent: '#FFB764',
    backdrop: 'rgba(238,252,242,0.7)',
    background: '#FFFFFF',
    disabled: '#838BA0',
    error: '#FE7985',
    notification: '#0B74D4',
    onBackground: '#FFFFFF',
    onSurface: '#000000',
    placeholder: '#AAAAAA',
    primary: '#2D3236',
    surface: '#FBFAFC',
    text: '#000000',
    shadowColor: '#FBFAFC',
    searchBackgroundColor: '#F5F6FA',
    modalBorder: '#36D07F',
    drawerText: '#FFFFFF',
    avatarBorder: '#36D07F',
    avatarBackground: '#EEFBF2',
    moon_logo: '#838BA0',
    main_title: '#FFFFFF'
  },
  fonts: FontsConfig()
}

export const DarkColorScheme = {
  ...DarkTheme,
  myOwnProperty: true,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    accent: '#f1c40f',
    backdrop: 'rgba(138,141,187,0.7)',
    background: '#1C1D31',
    disabled: '#35D07F',
    error: '#B00020',
    notification: '#f50057',
    onBackground: '#000000',
    onSurface: '#000000',
    placeholder: '#8A8DBB',
    primary: '#1C1D31',
    surface: '#282945',
    text: '#8A8DBB',
    shadowColor: '#FBCC5C',
    searchBackgroundColor: '#22223A',
    modalBorder: '#36D07F',
    drawerText: '#8A8DBB',
    avatarBorder: '#923DC3',
    avatarBackground: '#282945',
    moon_logo: '#2D9F7A',
    main_title: '#FFFFFF'
  },
  fonts: FontsConfig()
}
