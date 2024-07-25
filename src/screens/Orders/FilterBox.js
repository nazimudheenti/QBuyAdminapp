import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const FilterBox = ({ item, selected, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                marginRight: 10,
                borderRadius: 5,
                backgroundColor: selected === item?.value ? '#58D36E' : '#fff',
                shadowOffset: { height: 1, width: 1 },
                elevation: 1,
                shadowOpacity: 0.2,
                minHeight: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
            }}
        >
            <Text
                style={{
                    fontFamily: 'Poppins-Regular',
                    color: selected === item?.value ? '#fff' : '#23233C',
                    fontSize: 10,
                    paddingHorizontal: 15
                }}
            >{item?.name}</Text>
        </Pressable>
    )
}

export default FilterBox

const styles = StyleSheet.create({})