import { ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'

const TotalCard = ({label, count, bgImg}) => {
    const {width} = useWindowDimensions()
    return (
        <ImageBackground 
            source={bgImg}
            style={{ height: 90, marginTop: 13, paddingHorizontal: 20, justifyContent:'center',}}
            resizeMode='stretch'
        >
            <View style={{flexDirection:'row'}}>
                <Text style={styles.regularText}>{"Total "}</Text>
                <Text style={styles.boldText}>{label}</Text>
            </View>
            <Text style={styles.boldText}>{count}</Text>
        </ImageBackground>
    )
}

export default TotalCard

const styles = StyleSheet.create({
    regularText: {
        fontFamily: 'Poppins-Regular',
        color: '#fff',
        fontSize: 23,
        marginTop:-3
    },
    boldText: {
        fontFamily: 'Poppins-Bold',
        color: '#fff',
        fontSize: 23,
        marginTop:-3
    }
})