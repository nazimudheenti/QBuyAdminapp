import { StyleSheet, Text, ScrollView, TouchableOpacity, Image, Alert, Modal, View } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import HeaderWithTitle from '../../Components/HeaderWithTitle'
import moment from 'moment';
import ProfileDp from './ProfileDp';
import SettingsCard from './SettingsCard';
import Ionicons from 'react-native-vector-icons/Ionicons'
import OctiIcons from 'react-native-vector-icons/Octicons'
import AuthContext from '../../contexts/Auth';
import customAxios from '../../CustomeAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import DeviceInfo from "react-native-device-info";
// import reactotron from 'reactotron-react-native';
import { COLORS } from '../../config/COLORS';
import { queryClient } from '../../App'
import notifee from '@notifee/react-native';
import { env } from '../../config/constants';


const Settings = ({ navigation }) => {
    const authContext = useContext(AuthContext)

    const [modal, setModal] = useState(false);
    const { userData } = authContext
    // reactotron.log(userData, "USER")
    const goProfile = useCallback(() => {
        navigation.navigate('Profile')
    }, [navigation])

    const goNotificatnSound = useCallback(() => {
        navigation.navigate('NotificationSound')
    }, [navigation])

    const onStatusChange = useCallback(async (status) => {
        try {
            let bundleId = DeviceInfo.getBundleId();
            const type = bundleId.replace("com.qbuystoreapp.", "")
            const response = await customAxios.post("vendor/store-change-status", { status: status ? "active" : "inactive", type })

            if (response?.data) {
                // authContext.getProfileDetails()
                if (status === false) {
                    onLogout();
                }
            }
        } catch (error) {

            Toast.show({
                type: 'error',
                text1: error
            });
        }

    }, [])

    const handleModal = useCallback(() => { 
        setModal(!modal)
    }, [modal])

    const onLogout = async () => {
        try {
            handleLogout()
        } catch (error) {
            console.log("error", error)
            Toast.show({
                type: 'error',
                text1: error
            });
        }

    }

    const handleLogout = async () => {
        // await customAxios.post('auth/update-devicetoken', {
        //     token: ''
        // })
        await AsyncStorage.removeItem("token");
        authContext.setUserData({})
        queryClient.removeQueries()
        if (env === 'qbuy_live') {
        notifee.deleteChannel(env === 'qbuy_live' ? 'orders' : env === 'demo' ? 'orders_demo' : 'orders_dev')
        .then(() => {
            navigation.replace('Login');
            handleModal();
            Toast.show({
                type: 'success',
                text1: response?.data?.message
            });
        })
    }

    }

    return (
        <>
            <HeaderWithTitle title={'Settings'} />
            <ScrollView style={{ flex: 1, backgroundColor: '#F3F3F3', paddingHorizontal: 15, }}>
                <ProfileDp />
                {/* <SettingsCard
                    onPress={goProfile}
                    label={'Profile'}
                    leftElement={<Ionicons name='person' color={COLORS.primary} size={20} />}
                /> */}
                {/* <SettingsCard
                    onPress={goNotificatnSound}
                    label={'Notification Sound'}
                    leftElement={<Ionicons name='notifications' color='#E24349' size={20} />}
                /> */}
                {/* <SettingsCard
                    label={'Support'}
                    leftElement={<Ionicons name='headset' color='#E24349' size={18} />}
                /> */}
                {/* <SettingsCard
                    label={'Store Status'}
                    leftElement={<Image
                        style={styles.logo}
                        source={require('../../Images/storeRed.png')}
                        resizeMode='contain'
                    />}
                    toggle
                    value={userData?.status == "active"}
                    onPress={(status) => {
                        console.log("status", status);
                        onStatusChange(status)
                    }}
                /> */}
                <SettingsCard
                    label={'Logout'}
                    showArrow={false}
                    onPress={handleModal}
                    leftElement={<Ionicons name='log-out' color={'#000'} size={24} />}
                />

                <Modal visible={modal} transparent>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,.2)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            width: '80%',
                            height: 189,
                            backgroundColor: '#FFF',
                            borderRadius: 10,
                            alignItems: 'center',
                            padding: 34,
                            justifyContent: 'space-between'
                        }}>
                            <OctiIcons name='question' color={'#222'} size={33} />

                            <Text>Are you sure you want to Logout?</Text>

                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'center',
                                gap: 23
                            }}>
                                <TouchableOpacity style={{
                                    paddingHorizontal: 25,
                                    paddingVertical: 10,
                                    backgroundColor: '#555',
                                    borderRadius: 8
                                }} onPress={handleModal}>
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '600'
                                    }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    paddingHorizontal: 25,
                                    paddingVertical: 10,
                                    backgroundColor: 'blue',
                                    borderRadius: 8
                                }} onPress={onLogout}>
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '600'
                                    }}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </>
    )
}

export default Settings

const styles = StyleSheet.create({

    logo: {
        width: 20,
        height: 20,
    },
})