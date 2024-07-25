import { ImageBackground, NativeModules, StyleSheet, Image, View } from 'react-native'
import React from 'react'
import CommonAuthBg from '../auth/CommonAuthBg';
import { COLORS } from '../../config/COLORS';


const SplashScreen = ({ navigation }) => {

    return (
        <ImageBackground source={null} style={styles.bg} >
            <Image source={{ uri: COLORS?.logo }} style={{
                height: 205,
                width: 205
            }} />
        </ImageBackground>
    )
}

export default SplashScreen

const styles = StyleSheet.create({

    bg: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
})