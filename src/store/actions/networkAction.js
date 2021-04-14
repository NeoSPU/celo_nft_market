import {
  GET_ASSETS,
  GET_SINGLE_ASSET,
  GET_OFFSET_DATA,
  OFFSET_LOADING,
  HIDE_OFFSET_LOADING,
  SHOW_LOADER,
  HIDE_LOADER
} from '../../services/types/reduxTypes'
import axios from 'axios'
import * as c from '../../config/OpenSeaAPI'
import { AssetModel } from '../../models/AssetModel'
import { BrowseAssetModel } from '../../models/BrowseAssetModel'
import { SingleAssetModel } from '../../models/SingleAssetModel'
import { RecyclerViewsTypes } from '../../services/types/recyclerViewsTypes'

//=======================================================================
// MAIN GET NFT ASSETS OF BROWSE

export const retrievingAssets = () => {
  return async (dispatch) => {
    try {
      showLoader(dispatch)

      const response = await axios
        .get(c.RETRIEVING_ASSETS_URL)
        .then((response) => response.data.assets)
      const result = parsingBrowseAssetsResponse(response)
      
      dispatch({
        type: GET_ASSETS,
        payload: result
      })

      hideLoader(dispatch)

    } catch (e) {
      hideLoader(dispatch)
      console.log('Network Action Error (retrievingAssets()): ', e)
    }
  }
}

//=======================================================================

const parsingBrowseAssetsResponse = (response) => {
  const assets = []
  response.map((respItem) => {
    const result = BrowseAssetModel(respItem)
    if (result) {
      assets.push(result)
    }
  })
  return assets
}

//=======================================================================
// GET NFT ASSET DETAIL BY TOKEN ID and CONTRACT ADDRESS

export const retrievingSingleAsset = (asset_data) => {
  return async (dispatch) => {
    try {
      showLoader(dispatch)

      if (asset_data) {

        const url_end_point = c.RETRIEVING_SINGLE_ASSET + `${asset_data.address}/${asset_data.token_id}`

        const response = await axios
          .get(url_end_point)
          .then((response) => response.data)

        const result = parsingSingleAssetResponse(response)
        
        dispatch({
          type: GET_SINGLE_ASSET,
          payload: result
        })

      } else {
        dispatch({
          type: GET_SINGLE_ASSET,
          payload: {}
        })
      }

      hideLoader(dispatch)

    } catch (e) {
      hideLoader(dispatch)
      console.log('Network Action Error (retrievingSingleAsset()): ', e)
    }
  }
}

//=======================================================================

const parsingSingleAssetResponse = (response) => {
  
    const result = SingleAssetModel(response)
    return result ? result : {}

}

//=======================================================================
// MAIN GET OFFSET ASSETS OF BROWSE

export const retrievingOffsetAssets = (offset) => {
  return async (dispatch) => {
    try {
      offsetLoading(dispatch)
      const offsetURL = c.RETRIEVING_ASSETS_OFFSET_URL + `${offset}&limit=50`
      const response = await axios
        .get(offsetURL)
        .then((response) => response.data.assets)
      const result = parsingBrowseAssetsResponse(response)
      setTimeout(() => {
        dispatch({
          type: GET_OFFSET_DATA,
          payload: result
        })
        hideOffsetLoading(dispatch)
      }, 2000)
      // hideOffsetLoading(dispatch)
    } catch (e) {
      setTimeout(() => {
        hideOffsetLoading(dispatch)
      }, 2000)
      console.log('Network Action Error (retrievingOffsetAssets()): ', e)
    }
  }
}

//=======================================================================

const preparedItems = (openSeaAssets) => {
  const assets = []
  for (let item of openSeaAssets) {
    assets.push(AssetModel(item))
  }

  return [
    {
      type: RecyclerViewsTypes.ASSETS,
      item: data
    }
  ]
}

//=======================================================================
// OFFSET LOADING METHODS

const offsetLoading = (dispatch) => {
  setTimeout(() => {
    hideOffsetLoading(dispatch)
  }, 30000)
  dispatch({ type: OFFSET_LOADING })
}

const hideOffsetLoading = (dispatch) => {
  return dispatch({ type: HIDE_OFFSET_LOADING })
}

//=======================================================================
// LOADING METHODS

const showLoader = (dispatch) => {
  setTimeout(() => {
    hideLoader(dispatch)
  }, 30000)
  dispatch({ type: SHOW_LOADER })
}

const hideLoader = (dispatch) => {
  return dispatch({ type: HIDE_LOADER })
}
