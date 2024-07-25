import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CommonSquareButton = ({ position, bottom, mt, right, onPress, iconName, ml, backgroundColor = "#58D36E", disabled }) => {

    return (
        <TouchableOpacity
            style={[{
                width: 45,
                height: 45,
                backgroundColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                marginTop: mt,
                position: position,
                bottom: bottom,
                right: right
            }, ml ? { marginLeft: ml } : {}]}
            onPress={onPress}
            disabled={disabled}
        >
            <Ionicons name={iconName} color='#fff' size={28} marginLeft={2} />

        </TouchableOpacity>
    )
}

export default CommonSquareButton

const styles = StyleSheet.create({})