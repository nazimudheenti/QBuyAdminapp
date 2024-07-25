import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings';
import Profile from '../screens/Settings/Profile';
import NotificationSound from '../screens/Settings/NotificationSound';


const Stack = createStackNavigator();

const SettingsNav = () => {
    return (
        <Stack.Navigator initialRouteName='Work'  screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Settings" component={Settings}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="NotificationSound" component={NotificationSound}/>


        </Stack.Navigator>
    )
}

export default SettingsNav

const styles = StyleSheet.create({})