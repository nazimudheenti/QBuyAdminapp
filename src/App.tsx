import {
  Alert,
  AppState,
  Image,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navigation from './Navigations';
import AuthProvider from './contexts/Auth/AuthContext';
import LoadProvider from './contexts/Loader/loaderContext';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import store from './Redux/store';
import Notification from './Components/Notification';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SplashScreen from 'react-native-splash-screen'


export const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(false);




  useEffect(() => {
    SplashScreen.hide()          
  }, []);


  if (loading) {
    return <View />;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LoadProvider>
          <StatusBar
            backgroundColor={Platform.OS === 'android' ? '#888' : null}
          />

          <AuthProvider>
            <Notification />
            <Navigation />
            <Toast position="bottom" bottomOffset={20} />
          </AuthProvider>
        </LoadProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
