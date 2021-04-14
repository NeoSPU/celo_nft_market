import {
  CHECK_CELO,
  LOGIN_CELO_WALLET,
  READ_CELO_CONTRACT,
  WRITE_CELO_CONTRACT,
  SHOW_LOADER,
  HIDE_LOADER,
  DEPLOY_NFT_CONTRACT
} from '../../services/types/reduxTypes'

const initialState = {
  connectedWallet: {
    address: 'Not logged in',
    phoneNumber: 'Not logged in',
    cUSDBalance: 'Not logged in'
  },
  // connectedWallet: {
  //   address: '0x2XXXXXXXXXXXXXXXXXXXXXXXXX',
  //   phoneNumber: '+XXXXXXXXXXXXXXXXXXX',
  //   cUSDBalance: 73
  // },
  contractInstance: {},
  contractName: '',
  transaction_details: {}
}

export const celoNetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_CELO:
      return {
        ...state,
        contractInstance: action.payload
      }
    case LOGIN_CELO_WALLET:
      
      return {
        ...state,
        connectedWallet: action.payload
      }
    case READ_CELO_CONTRACT:
      console.log(`Reducer action.payload: ${action.payload}`)
      return {
        ...state,
        contractName: action.payload
      }
    case WRITE_CELO_CONTRACT:
      return {
        ...state,
        transaction_details: action.payload
      }
    case DEPLOY_NFT_CONTRACT:
      return {
        ...state,
        receiptNFT: action.payload
      }
    case SHOW_LOADER:
      return { ...state, loading: true }
    case HIDE_LOADER:
      return { ...state, loading: false }
    default:
      return state
  }
}
