import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CommonAuthBg = ({children}) => {
    return (
        <KeyboardAvoidingView
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {children}
        </KeyboardAvoidingView>
    )
}

export default CommonAuthBg

const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: 'white'
    }
})