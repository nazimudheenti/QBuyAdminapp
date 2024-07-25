import { StyleSheet, Text, View, Modal, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { Children } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomButton from './CustomButton'

const CommonModal = ({ onClose, visible, children, mt, text }) => {

    const { width } = useWindowDimensions()

    return (
        <Modal
            animationType="fade"
            transparent={true}
            backgroundColor="#000"
            visible={visible}
            style={{}}
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)" }}>
                <View
                    style={{ width: width - 30, backgroundColor: '#fff', borderRadius: 15, marginTop: mt ? mt : 250, alignSelf: 'center', shadowOffset: { height: 1, width: 1 }, elevation: 1, shadowOpacity: 0.2 }}
                >
                    <View style={{
                        flexDirection: 'row',
                        padding: 10,
                    }}>
                        <Text style={{
                            fontWeight: '700',
                            fontSize: 21,
                            flex: 1,
                            textAlign: 'center',
                            color: '#000'
                        }}>{text}</Text>
                        <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end', zIndex: 1 }}>
                            <Ionicons name={'close-circle'} size={28} color={'#000'} />
                        </TouchableOpacity>
                    </View>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

export default CommonModal

const styles = StyleSheet.create({})