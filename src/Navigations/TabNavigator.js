import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeNav from './HomeNav'
import Orders from '../screens/Orders'

import ProductsNav from './ProductsNav'
import Account from '../screens/Account'
import SettingsNav from './SettingsNav'
import { COLORS } from '../config/COLORS'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='HomeNav'
            screenOptions={({ route }) => ({
                unmountOnBlur: true,
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarActiveTintColor: '#000',
                tabBarShowLabel: false,
                tabBarInactiveTintColor: '#676767',
                tabBarStyle: { height: 60, position: 'absolute', bottom: 20, borderRadius: 20, marginHorizontal: 25, elevation: 1, shadowOpacity: 0.1, },
                tabBarItemStyle: { justifyContent: 'center', height: 60, },
                tabBarIcon: ({ focused, color }) => {
                    if (route.name === 'HomeNav') {
                        return (
                            <View style={{ width: '100%', alignItems: 'center', borderRightWidth: 1, borderColor: '#00000014' }}>
                                <Foundation name={'home'} size={27} color={color} />
                            </View>
                        )
                    }
                    // else if (route.name === 'Orders') {
                    //     return (
                    //         <View style={{ width: '100%', alignItems: 'center', borderRightWidth: 1, borderColor: '#00000014' }}>
                    //             <Ionicons name={'bag'} size={26} color={color} />
                    //         </View>
                    //     )
                    // }
                    // } else if (route.name === 'ProductsNav') {
                    //     return <>
                    //         <Image source={focused ? require('../Images/pdtGreen.jpeg') : require('../Images/pdtLite.jpeg')} resizeMode='contain' style={{ width: 30, height: 30 }} />
                    //     </>
                    // }
                    // else if (route.name === 'Account') {
                    //     return (
                    //         <View style={{ width: '100%', alignItems: 'center', borderRightWidth: 1, borderColor: '#00000014' }}>
                    //             <MaterialCommunityIcons name={'cash'} size={35} color={color} />
                    //         </View>
                    //     )
                    // }
                    else if (route.name === 'SettingsNav') {
                        return (
                            <View style={{ width: '100%', alignItems: 'center', borderRightWidth: 1, borderColor: '#00000014' }}>
                                <Entypo name={'cog'} size={26} color={color} />
                            </View>
                        )
                    }
                },
            })}
        >
            <Tab.Screen name="HomeNav" component={HomeNav} />
            {/* <Tab.Screen name="Orders" component={Orders} /> */}
            {/* <Tab.Screen name="ProductsNav" component={ProductsNav} />
            <Tab.Screen name="Account" component={Account} /> */}
            <Tab.Screen name="SettingsNav" component={SettingsNav} />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({})