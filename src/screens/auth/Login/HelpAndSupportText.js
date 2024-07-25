/* eslint-disable prettier/prettier */
import { StyleSheet, Text, useWindowDimensions, View, Linking } from 'react-native'
import React from 'react'

const HelpAndSupportText = () => {
    const { width } = useWindowDimensions();

    const openWhtsapp = () => {
        Linking.openURL(`whatsapp://send?phone=${8137009905}&text=${''}`);
    };
    return (
        <View style={ { alignItems: 'center', marginTop: 15, } }>
            <View style={ { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' } }>
                <Text style={ styles.text1 }>{ "Please reach out to our" }</Text>
                <Text style={ styles.text2 } >{ " Help & Support" }</Text>
                <Text style={ styles.text1 }>{ "or call your qbuy panda shopping assistant at" }</Text>
                <Text style={ styles.text3 } onPress={ openWhtsapp } >{ " 918137009905" }</Text>
            </View>
        </View>
    )
}

export default HelpAndSupportText

const styles = StyleSheet.create({
    text1: {
        fontFamily: 'Poppins-Light',
        color: '#8D8D8D',
        fontSize: 11,
    },
    text2: {
        fontFamily: 'Poppins-Bold',
        color: '#6DB87A',
        fontSize: 11,
    },
    text3: {
        fontFamily: 'Poppins-Bold',
        color: '#5E59FF',
        fontSize: 11,
    },
})