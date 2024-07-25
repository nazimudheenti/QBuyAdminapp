import { StyleSheet, TouchableOpacity, useWindowDimensions, View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../config/COLORS'

const SelectTab = ({ label, onPress, selected, wid, fontSize }) => {

    const { width, height } = useWindowDimensions()

    return (
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
            <View 
                style={{ 
                    borderBottomColor: selected ? COLORS.secondary : 'transparent', 
                    paddingBottom: 2, 
                    borderBottomWidth: selected ? 2 : 0, 
                    width: wid ? wid :  width / 3.9, 
                    alignItems: 'center' 
                }}  
            >
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: selected ? '#000' : '#8a8383', fontSize: fontSize? fontSize : 14 }}  my={3}>{label}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default SelectTab

const styles = StyleSheet.create({

    selectedText: {
        fontFamily: 'Poppins-SemiBold',
        color: '#008117',
        fontSize: 14
    },
    notSelectedText: {
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
        fontSize: 14
    },
})