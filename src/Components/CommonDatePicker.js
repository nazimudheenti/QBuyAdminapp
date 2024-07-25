import { StyleSheet, Text, ScrollView, Pressable, View, Alert } from 'react-native'
import React, { memo, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import CommonTexts from './CommonTexts';

const CommonDatePicker = ({ date, onConfirm, onCancel, label, openCalendar, onPress, mb, mt, pb, clearAction }) => {
    return (
        <>
            <View style={{ marginTop: mt ? mt : 20, marginHorizontal: 1, marginBottom: mb, paddingBottom: pb, width: "90%", alignSelf: "center" }}>
                <Pressable
                    onPress={onPress}
                    style={{
                        flexDirection: 'row',
                        minHeight: 45,
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        borderRadius: 7,
                        shadowOpacity: 0.1,
                        shadowRadius: 5,
                        elevation: 2,
                        shadowOffset: { width: 1, height: 1 },
                    }}
                >
                    <CommonTexts label={label || "Choose Date"} />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {clearAction && label && <Pressable style={{ marginRight: 10 }} onPress={() => clearAction()
                        }>
                            <Ionicons name={'close-circle-sharp'} size={25} color={"#80808080"} />
                        </Pressable>}
                        <Ionicons name={'calendar'} size={28} color={"#5261E0"} />
                    </View>
                </Pressable>
            </View>
            <DatePicker
                mode='date'
                modal
                open={openCalendar}
                date={date}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </>
    )
}

export default memo(CommonDatePicker);

const styles = StyleSheet.create({})