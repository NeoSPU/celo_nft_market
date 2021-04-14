import * as React from 'react';
import { ActivityIndicator, Colors, useTheme } from 'react-native-paper';
import { View, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const OSActivityIndicator = () => {
    const theme = useTheme()
    
    return (
        <View style={{flex: 1, width: width, height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.backdrop}}>
            <ActivityIndicator animating={true} color={theme.colors.accent} size='large'/>
        </View>
    )
}
