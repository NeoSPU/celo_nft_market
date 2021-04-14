import React from 'react'
import { Asset } from 'expo-asset'

class Icon {
    constructor(module, width, height) {
      this.module = module
      this.width = width
      this.height = height
      Asset.fromModule(this.module).downloadAsync()
    }
  }

  export const LOGO_BW = new Icon(
    require('../../../assets/Images/logo_bw.png'),
    50,
    50
  )

  export const LOGO_COLOR = new Icon(
    require('../../../assets/Images/logo_color.png'),
    50,
    50
  )

  export const LOGO_CELO = new Icon(
    require('../../../assets/Images/celo_glyph_color.png'),
    50,
    50
  )

  export const LOGO_OPEN_SEA = new Icon(
    require('../../../assets/Images/opensea-logomark-full-colored.png'),
    50,
    50
  )

  export const LOGO_MENU_BW = new Icon(
    require('../../../assets/Images/menu_drawer_bw.png'),
    50,
    50
  )

  export const LOGO_SEA_WHITE = new Icon(
    require('../../../assets/Images/opensea-logo-flat-colored-white.png'),
    50,
    50
  )

  export const LOGO_SEA_COLOR = new Icon(
    require('../../../assets/Images/opensea-logo-full-colored-blue.png'),
    50,
    50
  )

  export const LOGO_SEA_COLOR_TEXT_WHITE = new Icon(
    require('../../../assets/Images/opensea-logo-full-colored-white.png'),
    50,
    50
  )

  export const LOGO_CELLO_WHITE = new Icon(
    require('../../../assets/Images/celo_logo_white.png'),
    50,
    50
  )

  export const LOGO_CELLO_COLOR = new Icon(
    require('../../../assets/Images/celo_logo_color_white.png'),
    50,
    50
  )

  export const NFT_MARKET_COLOR = new Icon(
    require('../../../assets/Images/nft_market_logo_color.png'),
    27,
    150
  )

  export const NFT_MARKET_WHITE = new Icon(
    require('../../../assets/Images/nft_market_logo_white.png'),
    27,
    150
  )

  export const MOON_LIGHT = new Icon(
    require('../../../assets/Images/moon_light.png'),
    50,
    50
  )

  export const MOON_DARK = new Icon(
    require('../../../assets/Images/moon_dark.png'),
    50,
    50
  )

  export const VALORA_LIGHT = new Icon(
    require('../../../assets/Images/valora_light.png'),
    20,
    20
  )

  export const VALORA_DARK = new Icon(
    require('../../../assets/Images/valora_dark.png'),
    20,
    20
  )

  export const VALORA_LOGO = new Icon(
    require('../../../assets/Images/valora_logo.png'),
    20,
    20
  )

  export const CREATE_LIGHT = new Icon(
    require('../../../assets/Images/create_light.png'),
    20,
    50
  )

  export const CREATE_DARK = new Icon(
    require('../../../assets/Images/create_dark.png'),
    20,
    50
  )

  export const EXCHANGE = new Icon(
    require('../../../assets/Images/exchange.png'),
    20,
    50
  )

  export const PLACEHOLDER = new Icon(
    require('../../../assets/Images/placeholder_128.png'),
    20,
    20
  )

  export const CELO_WHITE = new Icon(
    require('../../../assets/Images/celo_wite.png'),
    50,
    50
  )

  export const CELO_COLOR = new Icon(
    require('../../../assets/Images/celo_color.png'),
    50,
    50
  )
