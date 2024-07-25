import { Image, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { Controller } from 'react-hook-form';

const CommonMultiSelectDropdown = ({ topLabel, mb, placeholder, data, value, onChange, search, height, mt, width, leftIcon, backgroundColor, error, labelField = "label", valueField = "label" }) => {

    const [isFocus, setIsFocus] = useState(false);
    return (
        <View style={{ marginBottom: mb, marginHorizontal: 1, marginTop: mt, width: width }}>
            {/* {renderLabel()} */}
            <Text
                style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                    fontSize: 11,
                    marginLeft: 5
                }}
            >{topLabel}</Text>
            <MultiSelect
                renderLeftIcon={() => (leftIcon)}
                style={{
                    height: height ? height : 45,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    backgroundColor: backgroundColor ? backgroundColor : '#fff',
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 2,
                    shadowOffset: { width: 1, height: 5 },
                    marginTop: 3
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={search ? search : null}
                maxHeight={300}
                labelField={labelField}
                valueField={valueField}
                placeholder={!isFocus ? placeholder ? placeholder : '' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={onChange}
                renderRightIcon={() => (
                    <Ionicons name={isFocus ? 'chevron-up-circle' : 'chevron-down-circle'} size={25} color={"#58D36E"} />
                )}
                renderItem={(item, seleted) => <View style={styles.item}>
                    <Text style={styles.selectedTextStyle}>{item.name}</Text>
                    <Ionicons name={seleted ? 'checkmark-circle' : 'checkmark-circle-outline'} size={25} color={seleted ? "#58D36E" : "#00000040"} />
                </View>}
                renderSelectedItem={(item, unSelect) => (
                    <Pressable onPress={() => unSelect && unSelect(item)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>{item.name}</Text>
                            <AntDesign color="#FF4646" name="delete" size={17} />
                        </View>
                    </Pressable>
                )}
                itemTextStyle={styles.dropdownText}
                mode='modal'
            />
            {error && <Text style={styles.errorText}>{error?.message}</Text>}
        </View>
    )
}

export default CommonMultiSelectDropdown

const styles = StyleSheet.create({

    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 13,
        color: '#23233C'
    },
    placeholderStyle: {
        fontSize: 12,
        color: '#23233C',
        fontFamily: 'Poppins-Regular'
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 13,
        color: '#23233C'
    },
    dropdownText: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: '#23233C',
    },
    errorText: {
        fontFamily: 'Poppins-Regular',
        color: 'red',
        fontSize: 11,
    }, selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#23233C'
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#23233C'
    },
    icon: {
        marginRight: 5,
    },
})