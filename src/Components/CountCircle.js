import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CountCircle = ({label}) => {
    return (
        <View
            style={{ borderRadius: 20, width: 15, height: 15, backgroundColor: '#576FD0', alignItems: 'center', justifyContent: 'center', }}
        >
            <Text style={{
                fontFamily: 'Poppins-Medium',
                color: '#fff',
                fontSize: 9,
            }}>{label}</Text>
        </View>
    )
}

export default CountCircle

const styles = StyleSheet.create({})