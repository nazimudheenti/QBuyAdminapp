import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'

const DetailsBox = ({ count, label, bg, bgBox, }) => {
    const { width } = useWindowDimensions()

    return (
        <View
            style={{ flexDirection: 'row', backgroundColor: bg ? bg : '#d7fae4', borderRadius: 10, justifyContent: 'space-between', marginTop: 10 }}
        >
            <View style={{ alignSelf: 'center', marginLeft: 10, flex: 1 }}>
                <View style={{ flexDirection: 'row', }}>
                    <Text
                        style={{ fontFamily: 'Poppins-SemiBold', color: '#000000', fontSize: 13, }}
                    >{label}</Text>
                </View>
            </View>

            <View
                style={{ width: width / 3.5, backgroundColor: bgBox ? bgBox : '#58D36E', borderRadius: 10, height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 15, marginBottom:3 }}>{'₹ '}</Text>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 20, }}>{count}</Text>
                </View>
            </View>
        </View>
    )
}

export default DetailsBox

const styles = StyleSheet.create({
    regularText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: '#8D8D8D',
        marginVertical: 3
    },
    lightItalicText: {
        fontFamily: 'Poppins-LightItalic',
        fontSize: 9,
        color: '#000',
    }
})