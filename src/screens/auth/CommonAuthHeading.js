import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const CommonAuthHeading = ({label, mt, textAlign}) => {
    return (
        <Text 
            style={{
                fontFamily: 'Quicksand-SemiBold',
                color: '#23233C',
                fontSize: 28,
                marginTop: mt,
                textAlign: textAlign
            }}
        >{label}</Text>
    )
}

export default memo(CommonAuthHeading);

const styles = StyleSheet.create({})