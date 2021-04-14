import { YellowBox } from 'react-native'
import * as Linking from 'expo-linking'

import {
  CHECK_CELO,
  LOGIN_CELO_WALLET,
  READ_CELO_CONTRACT,
  WRITE_CELO_CONTRACT,
  SHOW_LOADER,
  HIDE_LOADER,
  DEPLOY_NFT_CONTRACT
} from '../../services/types/reduxTypes'

import {
  requestTxSig,
  waitForSignedTxs,
  requestAccountAddress,
  waitForAccountAuth,
  FeeCurrency
} from '@celo/dappkit'
import { toTxResult } from '@celo/connect'

import '../../../global'
import { web3, kit } from '../../../root'

import HelloWorldContract from '../../components/celoComponents/celoContracts/HelloWorld.json'
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  "Warning: The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
  "Warning: The provided value 'ms-stream' is not a valid 'responseType'.",
  'web3-bzz package will be deprecated in version 1.3.5 and will no longer be supported.',
  'web3-shh package will be deprecated in version 1.3.5 and will no longer be supported.'
])

//=======================================================================
// CHECK CELO INSTANCE

export const checkCelo = () => {
  return async (dispatch) => {
    try {
      showLoader(dispatch)

      // Check the Celo network ID
      const networkId = await web3.eth.net.getId()

      // Get the deployed HelloWorld contract info for the appropriate network ID
      const deployedNetwork = HelloWorldContract.networks[networkId]

      // Create a new contract instance with the HelloWorld contract info
      const instance = new web3.eth.Contract(
        HelloWorldContract.abi,
        deployedNetwork && deployedNetwork.address
      )

      dispatch({
        type: CHECK_CELO,
        payload: instance
      })
      hideLoader(dispatch)
    } catch (e) {
      hideLoader(dispatch)
      console.log('Check Celo Instance Error :', e)
    }
  }
}

//=======================================================================
// LOGIN CELO WALLET

export const loginCeloWallet = () => {
  return async (dispatch) => {
    try {
      showLoader(dispatch)

      // A string you can pass to DAppKit, that you can use to listen to the response for that request
      const requestId = 'login'

      // A string that will be displayed to the user, indicating the DApp requesting access/signature
      const dappName = 'Alex NFT Market'

      // The deeplink that the Celo Wallet will use to redirect the user back to the DApp with the appropriate payload.
      const callback = Linking.makeUrl('/my/path')

      // Ask the Celo Alfajores Wallet for user info
      requestAccountAddress({
        requestId,
        dappName,
        callback
      })

      // Wait for the Celo Wallet response
      const dappkitResponse = await waitForAccountAuth(requestId)

      // Set the default account to the account returned from the wallet
      kit.defaultAccount = dappkitResponse.address

      // Get the stabel token contract
      const stableToken = await kit.contracts.getStableToken()

      // Get the user account balance (cUSD)
      const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount)

      // Convert from a big number to a string
      let cUSDBalance = cUSDBalanceBig.toString()

      // Update state
      const connectedWallet = {
        cUSDBalance,
        isLoadingBalance: false,
        address: dappkitResponse.address,
        phoneNumber: dappkitResponse.phoneNumber
      }

      dispatch({
        type: LOGIN_CELO_WALLET,
        payload: connectedWallet
      })
      hideLoader(dispatch)
    } catch (e) {
      hideLoader(dispatch)
      console.log('Check Celo Instance Error :', e)
    }
  }
}

//=======================================================================
// READ CELO CONTRACT

export const readCeloContract = (contractState) => {
  return async (dispatch) => {
    try {
      showLoader(dispatch)
      // Read the name stored in the HelloWorld contract
      let name = await contractState.helloWorldContract.methods.getName().call()
      console.log(`REDUX Contract Name: ${name}`)
      dispatch({
        type: READ_CELO_CONTRACT,
        payload: name
      })
      hideLoader(dispatch)
    } catch (e) {
      hideLoader(dispatch)
      console.log('Check Celo Instance Error :', e)
    }
  }
}

//=======================================================================
// WRITE CELO CONTRACT

export const writeCeloContract = (contractState) => {
  return async (dispatch) => {
    try {
      showLoader(dispatch)

      console.log(`ACTION contractState.address: ${contractState.address}`)

      const requestId = 'update_name'
      const dappName = 'Hello Celo'
      const callback = Linking.makeUrl('/my/path')

      // Create a transaction object to update the contract with the 'textInput'
      const txObject = await contractState.helloWorldContract.methods.setName(
        contractState.textInput
      )

      // Send a request to the Celo wallet to send an update transaction to the HelloWorld contract
      requestTxSig(
        kit,
        [
          {
            from: contractState.address,
            to: contractState.helloWorldContract.options.address,
            tx: txObject,
            feeCurrency: FeeCurrency.cUSD
          }
        ],
        { requestId, dappName, callback }
      )

      // Get the response from the Celo wallet
      const dappkitResponse = await waitForSignedTxs(requestId)
      const tx = dappkitResponse.rawTxs[0]

      // Get the transaction result, once it has been included in the Celo blockchain
      let result = await toTxResult(
        kit.web3.eth.sendSignedTransaction(tx)
      ).waitReceipt()

      dispatch({
        type: WRITE_CELO_CONTRACT,
        payload: { transaction_details: result }
      })
      hideLoader(dispatch)
    } catch (e) {
      hideLoader(dispatch)
      console.log('Check Celo Instance Error :', e)
    }
  }
}

//=======================================================================
// DEPLOY NFT CELO CONTRACT

export const deployNFTContract = (byteCode) => {
  // let bytecode = '0x608060405234...' // compiled Solidity deployment bytecode
  return async (dispatch) => {
    try {
      showLoader(dispatch)

      let tx = await kit.sendTransaction({
        data: bytecode
      })

      let receipt = tx.waitReceipt()
      console.log(receipt)

      dispatch({
        type: DEPLOY_NFT_CONTRACT,
        payload: receipt
      })
      hideLoader(dispatch)
    } catch (e) {
      hideLoader(dispatch)
      console.log('Deploy NFT Celo Contract Error :', e)
    }
  }
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
