import { StatusBar, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from './RootNavigation';
import Login from '../screens/auth/Login';
import SplashScreen from '../screens/SplashScreen';
import TabNavigator from './TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import reactotron from '../ReactotronConfig';
import AuthContext from '../contexts/Auth';
import { COLORS } from '../config/COLORS';


// import Menu from './Menu';


const Stack = createStackNavigator();

const Navigation = () => {
    const authContext = useContext(AuthContext)
    const [initialScreen, setInitialScreen] = useState(null)

    useEffect(() => {
        //authContext.getOrderStatus()
        checkLogin();
    }, []);
    
    const checkLogin = async () => {
        //await AsyncStorage.clear()
        //authContext.venderCategories()
        const token = await AsyncStorage.getItem("token");
        // reactotron.log({token})
        if (token) {

            // authContext.getProfileDetails()
            //authContext.filterCategories()
            // const user = await AsyncStorage.getItem("user");
            setInitialScreen('TabNavigator');
            // if(user){
            //     let userData = JSON.parse(user);
            //     // reactotron.log({userData})
            //     dispatch(getProfile(userData?._id))
            //     setInitialScreen('Menu');
            // }
            // else{
            //     setInitialScreen('AppIntro');
            // }
        }
        else {
            setInitialScreen('Login');
        }
    }
    if (!initialScreen) {
        return (
            <SplashScreen />
        )
    }


    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar backgroundColor={Platform.OS === 'android' ? COLORS.primary : null} />

            <Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false, gestureEnabled: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="TabNavigator" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

const styles = StyleSheet.create({})