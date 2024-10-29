import {AppState, StatusBar, StyleSheet} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import { useDispatch, useSelector } from 'react-redux';
import {navigationRef} from './RootNavigation';
import Login from '../screens/auth/Login';
import SplashScreen from '../screens/SplashScreen';
import TabNavigator from './TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import reactotron from '../ReactotronConfig';
import AuthContext from '../contexts/Auth';
import {COLORS} from '../config/COLORS';
import customAxios from '../CustomeAxios';
import {env} from '../config/constants';
import {queryClient} from '../App';
import notifee from '@notifee/react-native';

// import Menu from './Menu';

const Stack = createStackNavigator();

const Navigation = () => {
  const authContext = useContext(AuthContext);
  const [initialScreen, setInitialScreen] = useState(null);

  const handleLogout = async () => {
    // await customAxios.post('auth/update-devicetoken', {
    //     token: ''
    // })
    await AsyncStorage.removeItem('token');
    authContext.setUserData({});
    queryClient.removeQueries();
    notifee
      .deleteChannel(
        env === 'qbuy_live'
          ? 'orders'
          : env === 'demo'
            ? 'orders_demo'
            : 'orders_dev',
      )
      .then(() => {
        navigationRef.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
        // Toast.show({
        //   type: 'success',
        //   text1: response?.data?.message,
        // });
      })
      .catch(err => {
        console.log(err);
      });
  };

  async function onAppStateChange(status) {
    if (status === 'active') {
      const token = await AsyncStorage.getItem('token');

      customAxios
        .post('auth/tokencheck', {
          token
        })
        .then(data => {
        })
        .catch(err => {       
            if(err !== 'Authentication Error') {
              handleLogout();
            }
        });
    }
  }

  useEffect(() => {
    //authContext.getOrderStatus()
    checkLogin();

    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  const checkLogin = async () => {
    //await AsyncStorage.clear()
    //authContext.venderCategories()
    const token = await AsyncStorage.getItem('token');
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
    } else {
      setInitialScreen('Login');
    }
  };
  if (!initialScreen) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        backgroundColor={Platform.OS === 'android' ? COLORS.primary : null}
      />

      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
