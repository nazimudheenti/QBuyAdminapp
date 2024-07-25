import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useCallback } from 'react'
import { BlurView } from "@react-native-community/blur";
import Ionicons from 'react-native-vector-icons/Ionicons'
import ListItem from '../Components/ListItem'
import CommonTexts from '../Components/CommonTexts'

const DrawerContent = ({ navigation }) => {

    const {width, height} = useWindowDimensions()

    const openAttendance = useCallback(() => {
        navigation.navigate('Attendance')
    }, [])
    const openReservation = useCallback(() => {
        navigation.navigate('Reservation')
    }, [])
    const openSettings = useCallback(() => {
        navigation.navigate('Settings')
    }, [])

    return (
        <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems:'center', marginTop:5,}}>
                <TouchableOpacity 
                    onPress={()=> navigation.closeDrawer()} 
                    style={styles.closeCircle}
                >
                    <Ionicons name={"close"} color="#fff" size={20}  />
                </TouchableOpacity>
                <Image
                    style={styles.logo}
                    source={require('../Images/redLogo.png')}
                    resizeMode='contain'
                />
            </View>
            <ListItem
                onPress={openAttendance}
                label={'Attendance'}
            />
            <ListItem
                onPress={openReservation}
                label={'Reservation'}
            />
            <ListItem
                onPress={openSettings}
                label={'Settings'}
            />
        </ScrollView>
        </SafeAreaView>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    logo: {
		width: 80,
		height: 90,
		resizeMode: 'contain',
        marginTop:-10
	},
    closeCircle: { 
        alignSelf:'flex-end',  
        backgroundColor:"#000", 
        borderRadius:40, 
        width:25, 
        height:25,
        alignItems:'center', 
        justifyContent:'center', 
        marginRight:5 
    }
})