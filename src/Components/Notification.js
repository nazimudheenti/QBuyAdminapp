import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {useContext, useEffect} from 'react';
// import reactotron from 'reactotron-react-native';
import AuthContext from '../contexts/Auth';
import {navigationRef} from '../Navigations/RootNavigation';
import DeviceInfo from 'react-native-device-info';
import {PermissionsAndroid, Platform} from 'react-native';
import firebase from '@react-native-firebase/app';
import {env} from '../config/constants';

const Notification = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    onAppBootstrap();
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, []);

  useEffect(() => {
    //getCurrentLocation()
    notificationPermission();
    onAppBootstrap();
  }, []);

  async function notificationPermission() {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).then(async si => {

        if (env === 'qbuy_live') {
          await notifee.createChannel({
            id: 'orders',
            name: 'Order Channel',
            sound: Platform.OS === 'ios' ? 'order.wav' : 'order',
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,
          });
        } else if (env === 'demo') {
          await notifee.createChannel({
            id: 'orders_demo',
            name: 'Demo Channel',
            sound: Platform.OS === 'ios' ? 'order.wav' : 'order',
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,
          });
        } else if (env === 'qbuy') {
          await notifee.createChannel({
            id: 'orders_dev',
            name: 'Dev Channel',
            sound: Platform.OS === 'ios' ? 'order.wav' : 'order',
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,
          });
        }
      });
    }
  }

  async function onAppBootstrap() {
    // Register the device with FCM
    // const firebaseConfig = {
    // 	apiKey: "AIzaSyDtuAsjMGgYeJpAUxo8Szp_-lx76yDyjs8",
    // 	authDomain: "qbuygreen-2185c.firebaseapp.com",
    // 	projectId: "qbuygreen-2185c",
    // 	storageBucket: "qbuygreen-2185c.appspot.com",
    // 	messagingSenderId: "678656967091",
    // 	appId: "1:678656967091:web:4117872d12f5c50b79cbc6",
    // 	measurementId: "G-HMHGCFHDZG",
    // 	databaseURL: ""
    // };

    // Get the token
    // const token = await messaging().getToken();

    // auth.setFcmToken(token)

    // await firebase.initializeApp(firebaseConfig)
    // await messaging().registerDeviceForRemoteMessages();
    await notifee.requestPermission();
  }

  async function onMessageReceived(message) {
    console.log(message);
    

    notifee.displayNotification({
      id: message?.messageId,
      title: message?.notification?.title,
      body: message?.notification?.body,
      data: message?.data,
      android: {
        channelId: message?.notification?.android?.channelId,
        vibration: true,
        sound: 'order',
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        //sound: 'order'
      },
      ios: {
        sound: 'order.wav',
      },
    });
  }

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      // reactotron.log({ detail })
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);

          navigationRef.navigate('HomeNav');

          break;
      }
    });
  }, []);

  return null;
};

export default Notification;
