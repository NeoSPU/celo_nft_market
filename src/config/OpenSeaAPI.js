import { RecyclerViewsTypes } from '../services/types/recyclerViewsTypes'

export const OFFSET = 0
export const PAGESIZE = 50
export const OPTIONS = { method: 'GET' }

export const InitialAssetsState = {
  assets: [
    {
      type: RecyclerViewsTypes.ASSETS,
      item: {
        id: '',
        token_id: '',
        image_url: '',
        image_thumbnail_url: '',
        animation_url: '',
        background_color: '',
        asset_name: '',
        asset_description: '',
        asset_contract_address: '',
        asset_contract_type: '',
        asset_contract_created_date: '',
        asset_contract_name: '',
        asset_contract_schema_name: '',
        asset_contract_symbol: '',
        asset_contract_image_url: '',
        asset_contract_description: '',
        asset_contract_external_link: '',
        creator: '',
        collection_name: '',
        collection_description: '',
        sell_order_price: '',
        sell_order_token_symbol: '',
        sell_order_usd_token_name: '',
        sell_order_decimals: '',
        sell_order_eth_price: '',
        sell_order_usd_price: ''
      }
    }
  ]
}

//API URL
export const API_URL = 'https://api.opensea.io/api/v1/'

//API End Points
export const RETRIEVING_ASSETS_URL = `${API_URL}assets?order_direction=desc&offset=${OFFSET}&limit=${PAGESIZE}`

//API End Points WITH OFFSET
export const RETRIEVING_ASSETS_OFFSET_URL = `${API_URL}assets?order_direction=desc&offset=`


// https://api.opensea.io/api/v1/assets?order_direction=desc&offset=5&limit=50

//API Retrieving a single asset
// https://api.opensea.io/api/v1/asset/asset_contract_address/token_id/


export const RETRIEVING_SINGLE_ASSET = `https://api.opensea.io/api/v1/asset/`

export const InitialSingleAssetState = {
  
}