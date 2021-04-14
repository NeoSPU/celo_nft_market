import {
  GET_ASSETS,
  GET_SINGLE_ASSET,
  GET_OFFSET_DATA,
  OFFSET_LOADING,
  HIDE_OFFSET_LOADING,
  SHOW_LOADER,
  HIDE_LOADER
} from '../../services/types/reduxTypes'

const initialState = {
  assets: [],
  loading: false,
  offsetLoading: false,
  single_asset: {}
}

export const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSETS:
      return {
        assets: action.payload
      }
    case GET_SINGLE_ASSET:
      return {
        ...state,
        single_asset: action.payload
      }
    case GET_OFFSET_DATA:
      const mergedAssets = [...state.assets, ...action.payload]
      return {
        assets: mergedAssets
      }
    case OFFSET_LOADING:
      return { ...state, offsetLoading: true }
    case HIDE_OFFSET_LOADING:
      return { ...state, offsetLoading: false }
    case SHOW_LOADER:
      return { ...state, loading: true }
    case HIDE_LOADER:
      return { ...state, loading: false }
    default:
      return state
  }
}
