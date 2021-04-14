import React, { useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

import { useTheme, Searchbar } from 'react-native-paper'
import { SERVICE_TEXT } from '../../themes/titles'

import { MaterialCommunityIcons } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window')

export const OSSearchBar = (props) => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState('')

  const onChangeSearch = (query) => setSearchQuery(query)

  const clearIcon = () => {
    return (
      <MaterialCommunityIcons
        name="close"
        size={14}
        color={theme.colors.placeholder}
      />
    )
  }

  const iconSearchPressedHandler = () => {
    console.log('Icon Search Pressed')
  }

  return (
    <View style={styles.wrapp}>
      <Searchbar
        placeholder={SERVICE_TEXT.SEARCH_PLACEHOLDER}
        onChangeText={onChangeSearch}
        value={searchQuery}
        inputStyle={styles.searchText}
        clearIcon={() => clearIcon()}
        onIconPress={() => iconSearchPressedHandler()}
        style={{
          backgroundColor: theme.colors.searchBackgroundColor
        }}      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapp: {
    flex: 1,
    height: 60,
    marginBottom: 8
  },
  searchText: {
    fontSize: 12
  }
})
