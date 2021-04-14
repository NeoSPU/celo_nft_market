import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, Button, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import {
  checkCelo,
  loginCeloWallet,
  readCeloContract,
  writeCeloContract
} from '../../store/actions/celoNetworkAction'

export const HelloWorldComponent = (props) => {
  // Set the defaults for the state
  const contractHolder = {
    address: 'Not logged in',
    phoneNumber: 'Not logged in',
    cUSDBalance: 'Not logged in',
    contractInstance: {},
    contractName: '',
    textInput: ''
  }
  const [contractState, setContractState] = useState(contractHolder)

  const dispatch = useDispatch()
  const contractInstance = useSelector(
    (state) => state.celoNetworkReducer.contractInstance
  )
  const connectedWallet = useSelector(
    (state) => state.celoNetworkReducer.connectedWallet
  )

  const contractName = useSelector(
    (state) => state.celoNetworkReducer.contractName
  )

  useEffect(() => {
    let didCancel = false
    if (!didCancel) {
      dispatch(checkCelo())
    }
    return () => {
      didCancel = true
    }
  }, [])

  const loginHandler = () => {
    dispatch(loginCeloWallet())
  }

  const readContract = () => {
    dispatch(readCeloContract(contractState))
  }

  useEffect(() => {
    let didCancel = false
    if (!didCancel) {
      const newState = {
        ...contractState,
        address: connectedWallet.address,
        phoneNumber: connectedWallet.phoneNumber,
        cUSDBalance: connectedWallet.cUSDBalance,
        helloWorldContract: contractInstance
      }
      setContractState(newState)
    }
    return () => {
      didCancel = true
    }
  }, [contractInstance])

  useEffect(() => {
    let didCancel = false
    if (!didCancel) {
      const newState = {
        ...contractState,
        address: connectedWallet.address,
        phoneNumber: connectedWallet.phoneNumber,
        cUSDBalance: connectedWallet.cUSDBalance
      }
      setContractState(newState)
    }
    return () => {
      didCancel = true
    }
  }, [connectedWallet])

  useEffect(() => {
    let didCancel = false
    if (!didCancel) {
      const newState = {
        ...contractState,
        contractName: contractName
      }
      setContractState(newState)
    }
    return () => {
      didCancel = true
    }
  }, [contractName])

  const contractNameInput = (newname) => {
    const newState = {
      ...contractState,
      textInput: newname
    }
    setContractState(newState)
  }

  const changeContractName = () => {
    dispatch(writeCeloContract(contractState))
  }

  // console.log(`contractState.address: ${contractState.address}`)
  // console.log(`contractState.phoneNumber: ${contractState.phoneNumber}`)
  // console.log(`contractState.cUSDBalance: ${contractState.cUSDBalance}`)
  // console.log(
  //   `contractState.helloWorldContract: ${contractState.helloWorldContract}`
  // )
  // console.log(`contractState.contractName: ${contractName}`)
  // console.log(`contractState.textInput: ${contractState.textInput}`)

  return (
    <View style={styles.container}>
      <Text>Open up client/App.js to start working on your app!</Text>

      <Text style={styles.title}>Login first</Text>
      <Button title="login()" onPress={() => loginHandler()} />
      <Text style={styles.title}>Account Info:</Text>
      <Text>Current Account Address:</Text>
      <Text>{contractState.address}</Text>
      <Text>Phone number: {contractState.phoneNumber}</Text>
      <Text>cUSD Balance: {contractState.cUSDBalance}</Text>

      <Text style={styles.title}>Read HelloWorld</Text>
      <Button title="Read Contract Name" onPress={() => readContract()} />
      <Text>Contract Name: {contractState.contractName}</Text>

      <Text style={styles.title}>Write to HelloWorld</Text>
      <Text>New contract name:</Text>
      <TextInput
        style={{
          borderColor: 'black',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        placeholder="input new name here"
        onChangeText={(text) => setContractState({...contractState, textInput: text})}
        value={contractState.textInput}
      />
      <Button
        style={{ padding: 30 }}
        title="update contract name"
        onPress={() => changeContractName()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35d07f',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold'
  }
})
