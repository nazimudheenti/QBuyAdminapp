import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const HomeNav = () => {
    return (
        <Stack.Navigator initialRouteName='Home'  screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Home" component={Home}/>

           
        </Stack.Navigator>
    )
}

export default HomeNav

const styles = StyleSheet.create({})